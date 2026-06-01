let barChart, gaugeChart;

async function scan() {
    const target = document.getElementById("target").value;

    const res = await fetch("/scan", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({target})
    });

    const data = await res.json();

    document.getElementById("t").innerText = data.target;
    document.getElementById("s").innerText = data.status;
    document.getElementById("rText").innerText = data.risk + "%";

    const dot = document.getElementById("statusDot");
    dot.className = "dot " + data.status.toLowerCase();

    if (barChart) barChart.destroy();

    barChart = new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: ["Breaches"],
            datasets: [{
                data: [data.breaches],
                backgroundColor: "#38bdf8"
            }]
        },
        options: {
            plugins: {legend: {display: false}},
            scales: {y: {beginAtZero: true}}
        }
    });

    if (gaugeChart) gaugeChart.destroy();

    gaugeChart = new Chart(document.getElementById("gauge"), {
        type: "doughnut",
        data: {
            datasets: [{
                data: [data.risk, 100 - data.risk],
                backgroundColor: ["#38bdf8", "#1e293b"],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "75%",
            plugins: {legend: {display: false}}
        }
    });
}