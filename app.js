
function Plot() {
    //defining svg and margin for the chart  
    var svgWidth = 960;
    var svgHeight = 600;
    
    
    var margin = {
    top: 20,
    right: 40,
    bottom: 70,
    left:100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

     //SVG wrapper 
     //append the svg group with its size attributes
     var svg = d3.select("#scatter")
     .append("svg")
     .attr("width", svgWidth)
     .attr("height", svgHeight);

     var scatterplot = svg.append("g")
     .attr("transform", `translate(${margin.left}, ${margin.top})`);

     //Import csv data, 
     //pay attention to "then" since the promise
     d3.csv("assets/data/data.csv").then(function(Dataset){
    
        //return raw data 
        //transform string data to integer using +
            Dataset.forEach(function(column) {
                column.age = +column.age;
                column.smokes = +column.smokes;
                column.healthcare = +column.healthcare;
                column.poverty = +column.poverty;
                column.abbr = column.abbr;
                column.income = +column.income;
            });
        //Create scales for X and Y
            var xLinearScale = d3.scaleLinear()
                .domain([8.5, d3.max(Dataset, d => d.poverty)])
                .range([0, width]);
        
            var yLinearScale = d3.scaleLinear()
                .domain([3.5, d3.max(Dataset, d => d.healthcare)])
                .range([height, 0]);
          
        //Create x and y axis
            var xAxis = d3.axisBottom(xLinearScale);
            var yAxis = d3.axisLeft(yLinearScale);
        
        //Append axis 
        scatterplot.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
        
            scatterplot.append("g")
            .call(yAxis);
            
        //Make scatter plots 
        // describing circle attributes 
            var circlesGroup = scatterplot.selectAll("circle")
                .data(Dataset)
                .enter()
                .append("circle")
                .attr("cx", d => xLinearScale(d.poverty))
                .attr("cy", d => yLinearScale(d.healthcare))
                .attr("r", 15)
                .attr("fill", "lightblue")
                .attr("opacity", ".7")
                .attr("stroke-width", "1")
                .attr("stroke", "black");
        
                scatterplot.select("g")
                .selectAll("circle")
                .data(Dataset)
                .enter()
                .append("text")
                .text(d => d.abbr)
                .attr("x", d => xLinearScale(d.poverty))
                .attr("y", d => yLinearScale(d.healthcare))
                .attr("dy",-400)
                .attr("text-anchor", "middle")
                .attr("font-size", "10px")
                .attr("fill", "black");
             
                console.log(Dataset);
    
                scatterplot.append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0 - 100)
              .attr("x", 0 -300)
              .attr("dy", "1em")
              .attr("class", "axisText")
              .text("Lacks Healthcare (%)");
        
              scatterplot.append("text")
              .attr("transform", `translate(${width / 2}, ${height + margin.top + 35})`)
              .attr("class", "axisText")
              .text("In Poverty (%)");  
        });
        }
        
        Plot();