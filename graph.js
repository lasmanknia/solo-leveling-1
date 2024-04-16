function drawGraph(completionData) {
    const canvas = document.getElementById('completion-graph');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const containerWidth = document.querySelector('.graph-container').clientWidth; // Get container width
    const barCount = Math.min(Object.keys(completionData).length, 7); // Adjusted to 7 bars
    const barSpacing = (containerWidth - 100) / barCount; // Calculate spacing based on available width
    const barWidth = barSpacing * 0.5; // Adjusted bar width

    const canvasWidth = containerWidth;
    const canvasHeight = 300; // Adjusted canvas height
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const graphWidth = canvas.width - 100, graphHeight = canvas.height - 50;
    const lastSevenData = Object.entries(completionData).slice(-7); // Adjusted to get last seven entries

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

    ctx.beginPath();
    ctx.moveTo(50, 20);

    let x = 50;
    for (const [, completionPercentage] of lastSevenData) {
        const barHeight = (graphHeight - 50) * (completionPercentage / 100);
        ctx.fillStyle = 'hsl(154, 84%, 47%)';
        ctx.fillRect(x, graphHeight - barHeight, barWidth, barHeight);

        x += barSpacing;
    }
}

// Function to refresh the graph with new data
function refreshGraph() {
    const completionData = JSON.parse(localStorage.getItem('completionData')) || {};
    drawGraph(completionData);
}

// Call refreshGraph whenever you want to update the graph with new data
refreshGraph();
