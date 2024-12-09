export function drawTriangleX(x1, y1, x2, y2, x3, y3) {
    const svg = document.getElementById('coordinatePlane');
    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    triangle.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    triangle.setAttribute('fill', 'black');
    svg.appendChild(triangle);
}

export function drawTriangleY(x1, y1, x2, y2, x3, y3) {
    const svg = document.getElementById('coordinatePlane');
    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    triangle.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    triangle.setAttribute('fill', 'black');
    svg.appendChild(triangle);
}

export function drawTriangle(x1, y1, x2, y2, x3, y3) {
    const svg = document.getElementById('coordinatePlane');
    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    triangle.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    triangle.setAttribute('fill', 'yellow');
    triangle.setAttribute('fill-opacity', 0.5);
    svg.appendChild(triangle);
}

export function drawRectangle(x, y, width, height) {
    const svg = document.getElementById('coordinatePlane');
    const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectangle.setAttribute('x', x);
    rectangle.setAttribute('y', y);
    rectangle.setAttribute('width', width);
    rectangle.setAttribute('height', height);
    rectangle.setAttribute('fill', 'red');
    rectangle.setAttribute('fill-opacity', 0.5);
    svg.appendChild(rectangle);
}

export function drawEllipse(values) {
    const svg = document.getElementById('coordinatePlane');
    const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    ellipse.setAttribute('d', values);
    ellipse.setAttribute('fill', 'blue');
    ellipse.setAttribute('fill-opacity', 0.5);
    svg.appendChild(ellipse);
}

export function drawPoint(x, y, color, r) {
    const svg = document.getElementById('coordinatePlane');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x * 50 * r + 250); // Перевод координат
    circle.setAttribute('cy', -(y * 50 * r - 250));
    circle.setAttribute('r', 3);
    circle.setAttribute('fill', color);
    svg.appendChild(circle);
}

export function drawCoordinatePlane() {
    const svg = document.getElementById('coordinatePlane'); // Fetch the SVG dynamically
    const width = svg.getAttribute('width');
    const height = svg.getAttribute('height');
    const originX = width / 2;
    const originY = height / 2;
    const tickSpacing = 50;
    const tickSize = 5;
    let radius = 1; // Default radius

    // Clear the SVG canvas
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    // Draw X-axis
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', 0);
    xAxis.setAttribute('y1', originY);
    xAxis.setAttribute('x2', width);
    xAxis.setAttribute('y2', originY);
    xAxis.setAttribute('stroke', 'black');
    svg.appendChild(xAxis);

    // Draw Y-axis
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', originX);
    yAxis.setAttribute('y1', 0);
    yAxis.setAttribute('x2', originX);
    yAxis.setAttribute('y2', height);
    yAxis.setAttribute('stroke', 'black');
    svg.appendChild(yAxis);

    // Draw X and Y axis labels
    const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xLabel.setAttribute('x', width - 15);
    xLabel.setAttribute('y', originY - 7);
    xLabel.setAttribute('font-size', '14');
    xLabel.textContent = 'x';
    svg.appendChild(xLabel);

    const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yLabel.setAttribute('x', originX + 7);
    yLabel.setAttribute('y', 15);
    yLabel.setAttribute('font-size', '14');
    yLabel.textContent = 'y';
    svg.appendChild(yLabel);

    // Draw ticks along X-axis
    for (let i = tickSpacing; i < width; i += tickSpacing) {
        drawTick(svg, originX + i, originY, true);
        drawTick(svg, originX - i, originY, true);
    }

    // Draw ticks along Y-axis
    for (let i = tickSpacing; i < height; i += tickSpacing) {
        drawTick(svg, originX, originY + i, false);
        drawTick(svg, originX, originY - i, false);
    }
}

function drawTick(svg, x, y, isHorizontal) {
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const tickSize = 5;

    if (isHorizontal) {
        tick.setAttribute('x1', x);
        tick.setAttribute('y1', y - tickSize);
        tick.setAttribute('x2', x);
        tick.setAttribute('y2', y + tickSize);
    } else {
        tick.setAttribute('x1', x - tickSize);
        tick.setAttribute('y1', y);
        tick.setAttribute('x2', x + tickSize);
        tick.setAttribute('y2', y);
    }

    tick.setAttribute('stroke', 'black');
    svg.appendChild(tick);
}

export function redrawCoordinatePlane(radius = 1) {
    const svg = document.getElementById('coordinatePlane'); // Fetch dynamically
    const width = svg.getAttribute('width');
    const height = svg.getAttribute('height');
    const originX = width / 2;
    const originY = height / 2;
    const unitSegment = 50;

    drawCoordinatePlane();
    drawTriangleX(width, originY, width - 5, originY - 5, width - 5, originY + 5);
    drawTriangleY(originX, 0, originX - 5, 5, originX + 5, 5);

    drawTriangle(originX, originY, originX + unitSegment * (-2 / radius), originY, originX, originY - unitSegment * (-2 / radius), radius);
    drawRectangle(originX, originY, unitSegment * (1 / radius), 2*unitSegment * (1 / radius));
    drawEllipse(`M ${originX} ${originY - unitSegment * (1 / radius * 2)} A ${unitSegment * (1 / radius * 2)} ${unitSegment * (1 / radius * 2)} 0 0 1 ${originX + unitSegment * (1 / radius * 2)} ${originY} L ${originX} ${originY} Z`);
}