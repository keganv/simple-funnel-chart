function FunnelChart(data) {

    // Total of all level values
    this.totalValue = data.options && data.options.totalValue ? data.options.totalValue : 0;

    // Do not change
    this.y = 0;

    // Do not change
    this.level = 0;

    // Size of text, must be string
    this.fontSize = data.options && data.options.fontSize ? data.options.fontSize : '4';

    // Size of text, must be string
    this.fontColor = data.options && data.options.fontColor ? data.options.fontColor : '#000000';

    this.createLevels = function () {
        const self = this;
        for (const level in data.levels) {
            if (data.levels.hasOwnProperty(level)) {
                const value = data.levels[level].value;
                if (value > 0) {
                    if (!this.totalValue) {
                        self.totalValue = self.totalValue + value;
                    }
                    const rect = self.createRect(data.levels[level]);
                    document.querySelector('.funnel g.levels').appendChild(rect);
                }
            }
        }
    };

    this.createRect = function (level) {
        const rect   = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); // Create the rect element.
        const height = ((level.value / this.totalValue) * 100);
        rect.setAttribute('width','100%');
        rect.setAttribute('height', height.toString());
        rect.setAttribute('x','0');
        rect.setAttribute('y', this.y.toString());
        rect.setAttribute('fill', level.color);
        rect.setAttribute('title', level.label);
        this.y = this.y + height;
        this.createLabel(height, level.label, level.value, level.color);
        this.level++;
        return rect;
    };

    this.createLabel = function (height, label, value, color) {
        const valString = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const labels    = document.querySelector('.labels');
        const line      = document.createElementNS('http://www.w3.org/2000/svg', 'line');  // Create the line element.
        const text      = document.createElementNS('http://www.w3.org/2000/svg', 'text');  // Create the text element.
        const tspan1    = document.createElementNS('http://www.w3.org/2000/svg', 'tspan'); // Create the tspan element.
        const tspan2    = document.createElementNS('http://www.w3.org/2000/svg', 'tspan'); // Create the tspan element.
        const textNode1 = document.createTextNode(label);
        const textNode2 = document.createTextNode(valString);
        const xPos      = 78;
        const yPos      = this.y - height / 2;
        line.setAttribute('x1', '30');
        line.setAttribute('y1', yPos.toString());
        line.setAttribute('x2', xPos.toString());
        line.setAttribute('y2', yPos.toString());
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', '.25');
        text.setAttribute('font-size', this.fontSize);
        text.setAttribute('fill', this.fontColor);
        tspan1.setAttribute('x', (xPos + 2).toString());
        tspan2.setAttribute('x', (xPos + 2).toString());
        tspan1.setAttribute('y', (yPos - 1.5).toString());
        tspan2.setAttribute('y', (yPos + 3.5).toString());
        tspan1.appendChild(textNode1);
        tspan2.appendChild(textNode2);
        text.appendChild(tspan1);
        text.appendChild(tspan2);
        labels.appendChild(line);
        labels.appendChild(text); // Append the line and label to the SVG.
    };

    this.createLevels();
}
