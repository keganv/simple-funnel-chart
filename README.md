# Simple Funnel Chart

Create funnel charts with labels, any amount of levels (stages), and custom colors. The JavaScript class can be included into your template or view file however you choose, (link, require, as a module or import). In the example below I am simply using a script tag. Simply pass a JSON data object to the constructor function. You choose how the data is passed to the class. This could be available in your view template, or you could make an AJAX request within your JavaScript to retrieve then pass the data. The SVG HTML must look like the markup below.

## HTML Markup/Template
    <!-- required to be rendered -->
    <svg id="funnel-container" perspectiveAspectRatio="none">
        <svg class="labels" height="100%" width="70%" viewBox="-25 0 100 100" overflow="visible"></svg>
        <svg class="funnel" height="100%" width="70%" viewBox="0 0 100 100">
            <defs>
                <clipPath id="funnel-clip">
                    <polygon points="0 0, 100 0, 60 80, 55 100, 45 100, 40 80"></polygon>
                </clipPath>
            </defs>
            <rect height="100%" width="100%" fill="white" clip-path="#funnel-clip" style="clip-path:url('#funnel-clip');"></rect>
            <g class="steps" clip-path="#funnel-clip" style="clip-path:url('#funnel-clip');"></g>
        </svg>
    </svg>
    <!-- end required -->
    <script src="keganv-funnel-chart.js" />
    <script>
      new FunnelChart(data);
    </script>

## JSON Data Object Structure

The JSON object that you pass to the class must be structured like the example below. There has to be a levels object. Within the levels object, the value property must be an integer. The options object is optional. The options properties are `fontSize`, `fontColor`, and `totalValue`. The total value is optional as the JavaScript itself will add all the level values and store that on the `totalValue` property. However, you have the option of passing the total value yourself if you choose to for your specific needs.

    {
        "levels": {
            "0": {
                "label": "Asset Discovery",
                "value": 500000,
                "color": "#ADE472"
            },
            "1": {
                "label": "Plan Presented",
                "value": 400000,
                "color": "#88C347"
            },
            "2": {
                "label": "Paperwork Signed",
                "value": 500000,
                "color": "#1E814C"
            },
            "3": {
                "label": "Submitted",
                "value": 1000000,
                "color": "#0d5c32"
            }
            // More levels here
        },
        "options": {
            "fontSize": 3.5,
            "fontColor": "#000000",
            "totalValue": 2400000
        }
    }

## Future Features

- Ability for the `color` property to not be required on each level.
- Ability to pass a hex value color in options array for automatic level color theming.
- Ability to pass an entire `colors` array with specific values that will be used in succession with levels.
  
