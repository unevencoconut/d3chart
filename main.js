class D3Chart{
    //** */ Data Argument must be JSON */
    constructor(data, container, ...options){
        /**Deconstruct Options to apprropriate variables */
        const [{
            height,
            width,
        }] = options;

        this.data = this._parsedata(data); // JSON Only
        this.container = container ?? console.error(`D3 Chart: No container selected`);
        this.height = height ?? 500;
        this.width = width ?? this._autowidth();
        this.svg = this._svg();
    };

    _autowidth(){
        let { container } = this;
        let target = document.querySelector(container);

        return target.clientWidth;
    };

    _svg(){
        let { height, width, container } = this;

        let target = document.querySelector(container);
        let svg = d3.select(target)
                    .append("svg")
                    .attr("viewBox", `0 0 ${width} ${height}`)

        return svg
    };

    _parsedata(json){
        let data;
        try {
            data = JSON.parse(json);
        } catch (error) {
            throw new Error(`
            The D3 Chart requires a JSON Object as its first argument for the data.
            You likely need to check your JSON for errors or you did not use a JSON Object.
            Here is the system error:
            ${error}
            `)
        };

        return data;
    };
};

const bubbleChart = ((data,container,options)=>{

    class D3BubbleChart extends D3Chart {
        constructor(data, ...options){
            super(data, ...options);
            let [{bubblelimit,bubblecolor}] = options;

            this.bubblelimit = bubblelimit ?? 10;
            this.bubblecolor = bubblecolor ?? '#42a7f5';
            this.data = this._bubbledata();
            this.radius = this._radius();
            this.scale = this._scale();
            this.circles = this._circles();
            this.text = this._text();
            this._simulation();
        };

        _bubbledata(){
            let { data,bubblelimit } = this;

                data = data
                    .slice(0, bubblelimit)
                    .map((item)=>{

                        let text = Object.keys(item)[0];
                        let radius = Object.keys(item)[1];

                        return {text:item[text],radius:item[radius]}
                });

                return data
        };

        _text(){
            let { data, scale, svg } = this;
            let { max } = this.radius;

            let text = svg.selectAll("text")
                            .data(data)
                            .enter()
                            .append("text")
                                .attr('font-size', 12)
                                .style('text-transform','uppercase')
                                .style('text-anchor', 'middle')
                                .style('font-family','Roboto')
                                .attr("fill","white")
                                .text(function(d){
                                    return scale(d.radius) >= scale(max)/3 ? d.text : null
                                    })

            return this.text = text;
        };

        _scale(){
            let { radius:{max} } = this;

            let scale = d3.scaleLinear()
                        .domain([0, max]) /** Complete Set of Values */
                        .range([10,100]) /** MinMax Radius */

            return scale
        };

        _radius(){
            let { data } = this;

            let max = Math.max.apply(Math, data.map((i)=>{return i.radius}));
            let min = Math.min.apply(Math, data.map((i)=>{return i.radius}));

            return { min : min, max : max };
        };

        _circles(){
            let { data, scale, svg, bubblecolor } = this;

            let circles = svg.selectAll("circle")
                            .data(data)
                            .enter()
                            .append("circle")
                                .attr("fill",bubblecolor)
                                .attr("r", d => { return scale(d.radius) } )

            return circles
        };

        _simulation(){
            let { width, height, scale, data, circles, text } = this;

            let simulation = d3.forceSimulation()
                                .force("center", d3.forceCenter().x(width/2).y(height/2)) /** Start with a Center Gravity */
                                .force("force", d3.forceCollide().radius(d=>{return scale(d.radius)+3 })) /** Tell the Bubbles to not collide when moving to the center */
                                .force("xforce", d3.forceX().strength(0.1))
                                .force("yforce", d3.forceY().strength(0.5))

                simulation
                        .nodes(data)
                        .on("tick", function(){
                            circles
                                .attr("cx", function(d) { return d.x = Math.max(scale(d.radius), Math.min(width - scale(d.radius), d.x)); })
                                .attr("cy", function(d) { return d.y = Math.max(scale(d.radius), Math.min(height - scale(d.radius), d.y)); });
                            text
                                .attr("x", function(d) { return d.x = Math.max(scale(d.radius), Math.min(width - scale(d.radius), d.x)); })
                                .attr("y", function(d) { return d.y = Math.max(scale(d.radius), Math.min(height - scale(d.radius), d.y)) + 3; });
                        });

            return
        };
    };

    return new D3BubbleChart(data,container,options)
});