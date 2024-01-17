var ctx = document.getElementById('myPieChart').getContext('2d');

// LocalStorage (Lagrer resultatene)
function getDataFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? parseInt(value) : 0;
}

// Default stemmer (Antall stemmer fra starten)
var defaultVotes = 50;

var AP = getDataFromLocalStorage('AP') || defaultVotes;
var SP = getDataFromLocalStorage('SP') || defaultVotes;
var H = getDataFromLocalStorage('H') || defaultVotes;

// Data (Data for piecharten)
var data = {
    labels: ['Arbeiderpartiet', 'Senterpartiet', 'Høyre'],
    datasets: [{
        data: [AP, SP, H],
        backgroundColor: [
            'rgba(215, 9, 38, 0.7)',
            'rgba(31, 160, 40, 0.7)',
            'rgba(34, 92, 226, 0.7)'
        ],
        borderColor: [
            'rgba(215, 9, 38, 1)',
            'rgba(31, 160, 40, 1)',
            'rgba(34, 92, 226, 1)'
        ],
        borderWidth: 1
    }]
};

// Settings (Ekstra innstillinger for piecharten)
var options = {
    responsive: false,
    maintainAspectRatio: false,
    legend: {
        display: true,
        position: 'top'
    }
};

// Pie chart
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});

// Oppdatere diagrammet (Oppdaterer diagrammet med de nye tallene)
function updateChart() {
    myPieChart.data.datasets[0].data = [AP, SP, H];
    localStorage.setItem('AP', AP);
    localStorage.setItem('SP', SP);
    localStorage.setItem('H', H);
    myPieChart.update();
}

// Stemmeknapper (Knapper for å stemme)
function voteAP() {
    AP++;
    updateChart();
    console.log("AP Votes: " + AP);
}

function voteSP() {
    SP++;
    updateChart();
    console.log("SP Votes: " + SP);
}

function voteH() {
    H++;
    updateChart();
    console.log("H Votes: " + H);
}

function resetVotes() {
    if (confirm("Er du sikker på at du vil nullstille alle stemmene?")) {
        AP = SP = H = 50;
        updateChart();
    }
}