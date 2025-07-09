const countries = ['Fidji', 'Nouvelle-Calédonie', 'Papouasie-Nouvelle-Guinée', 'Kiribati', 'Tonga'];
let selectedCountry = null;

// Utilitaire pour filtrer les valeurs null
function filterNulls(arr) {
    return arr.filter(v => v !== null && v !== undefined);
}

function getSeriesData(indicator, country) {
    return Object.keys(data[indicator][country])
        .map(y => data[indicator][country][y])
        .filter(v => v !== null && v !== undefined);
}
function averageOverYears(indicator, country) {
    const values = filterNulls(Object.values(data[indicator][country]));
    if (values.length === 0) return null;
    const sum = values.reduce((acc, v) => acc + v, 0);
    return +(sum / values.length).toFixed(2);
}

const commonTimeOptions = {
    chart: { height: 280, toolbar: { show: false }, animations: { enabled: true, easing: 'easeinout', speed: 600 } },
    stroke: { curve: 'smooth', width: 3 },
    markers: { size: 5 },
    xaxis: {
        categories: Array.from({length: 11}, (_, i) => 2014 + i),
        labels: { style: { colors: 'var(--color-text-light)' } },
        axisBorder: { show: true, color: 'var(--color-border)' },
        axisTicks: { show: true, color: 'var(--color-border)' }
    },
    yaxis: { labels: { style: { colors: 'var(--color-text-light)' } }, min: 0, max: 100 },
    tooltip: { theme: 'dark', x: { format: 'yyyy' }, y: { formatter: val => val !== null && val !== undefined ? val.toFixed(2) + '%' : '' } },
    legend: { show: true, labels: { colors: 'var(--color-primary)' }, position: 'top', horizontalAlign: 'center' },
    grid: { borderColor: 'var(--color-border)' }
};

// Instances
let chartWomenMenParliament, chartSecondaryCompletion, chartYouthNEET, chartPieParliament, chartRadar;
let compareWomenMenParliament, compareSecondaryCompletion, compareYouthNEET, compareRadar;

// Nettoyage des containers avant affichage pour éviter les mélanges
function clearCountryCharts() {
    document.getElementById('chartWomenMenParliament').innerHTML = '';
    document.getElementById('chartSecondaryCompletion').innerHTML = '';
    document.getElementById('chartYouthNEET').innerHTML = '';
    document.getElementById('chartPieParliament').innerHTML = '';
    document.getElementById('chartRadar').innerHTML = '';
}
function clearCompareCharts() {
    document.getElementById('compareWomenMenParliament').innerHTML = '';
    document.getElementById('compareSecondaryCompletion').innerHTML = '';
    document.getElementById('compareYouthNEET').innerHTML = '';
    document.getElementById('compareRadar').innerHTML = '';
}

// Graphiques individuels
function createChartWomenMenParliament() {
    const years = Array.from({length: 11}, (_, i) => 2014 + i);
    const womenData = years.map(y => data.womenParliament[selectedCountry]?.[y] ?? null);
    const menData = years.map(y => data.menParliament[selectedCountry]?.[y] ?? null);

    const options = {
        ...commonTimeOptions,
        chart: {...commonTimeOptions.chart, type: 'line'},
        series: [
            { name: 'Femmes', data: womenData },
            { name: 'Hommes', data: menData }
        ],
        colors: ['var(--color-primary)', 'var(--color-bg)'],
        title: { text: `Femmes et Hommes en parlement - ${selectedCountry}`, style: { color: 'var(--color-primary)', fontWeight: 'bold' } },
        yaxis: {
            labels: {
                style: { colors: 'var(--color-text-light)' },
                formatter: val => Math.round(val)
            },
            min: 0,
            max: 100
        },
        legend: {
            show: true,
            labels: {
                colors: ['var(--color-primary)', '#000000']
            }
        },
        tooltip: {
            y: {
                formatter: val => val !== null && val !== undefined ? val.toFixed(2) + '%' : '',
                style: { color: '#000000' }
            },
            theme: 'dark',
        }
    };
    if(chartWomenMenParliament) chartWomenMenParliament.destroy();
    chartWomenMenParliament = new ApexCharts(document.querySelector("#chartWomenMenParliament"), options);
    chartWomenMenParliament.render();
}
function createChartSecondaryCompletion() {
    const years = Array.from({length: 11}, (_, i) => 2014 + i);
    const womenData = years.map(y => data.secondaryCompletion[selectedCountry]?.[y] ?? null);
    const menData = womenData.map(v => v !== null && v !== undefined ? 100 - v : null);

    // Formatter pour afficher entier ou 2 décimales max
    function formatValue(val) {
        if (val === null || val === undefined) return '';
        return Number.isInteger(val) ? val : val.toFixed(2);
    }

    const options = {
        chart: { height: 280, type: 'bar', stacked: true, toolbar: { show: false }, animations: { enabled: true, easing: 'easeinout', speed: 600 } },
        series: [
            { name: 'Femmes', data: womenData },
            { name: 'Hommes', data: menData }
        ],
        xaxis: { categories: years, labels: { style: { colors: 'var(--color-text-light)' } }, axisBorder: { color: 'var(--color-border)' }, axisTicks: { color: 'var(--color-border)' } },
        yaxis: { 
            min: 0, 
            max: 100, 
            labels: { 
                style: { colors: 'var(--color-text-light)' },
                formatter: val => Math.round(val)
            } 
        },
        colors: ['var(--color-primary)', 'var(--color-bg)'],
        title: { text: `Taux d’achèvement du 2e cycle secondaire - ${selectedCountry}`, style: { color: 'var(--color-primary)', fontWeight: 'bold' } },
        tooltip: { 
            y: { 
                formatter: val => (val !== null && val !== undefined) ? formatValue(val) + '%' : '' 
            }, 
            theme: 'dark' 
        },
        dataLabels: {
            enabled: true,
            formatter: val => (val !== null && val !== undefined) ? formatValue(val) : ''
        },
        plotOptions: { bar: { borderRadius: 5, columnWidth: '50%' } },
        legend: {
            show: true,
            labels: {
                colors: ['var(--color-primary)', '#000000']
            }
        },
        grid: { borderColor: 'var(--color-border)' }
    };
    if(chartSecondaryCompletion) chartSecondaryCompletion.destroy();
    chartSecondaryCompletion = new ApexCharts(document.querySelector("#chartSecondaryCompletion"), options);
    chartSecondaryCompletion.render();
}
function createChartYouthNEET() {
    const years = Array.from({length: 11}, (_, i) => 2014 + i);
    const womenData = years.map(y => data.youthNEET[selectedCountry]?.[y] ?? null);
    const menData = womenData.map(v => v !== null && v !== undefined ? 100 - v : null);

    const options = {
        chart: { height: 280, type: 'bar', stacked: true, toolbar: { show: false }, animations: { enabled: true, easing: 'easeinout', speed: 600 } },
        series: [
            { name: 'Femmes', data: womenData },
            { name: 'Hommes', data: menData }
        ],
        xaxis: { categories: years, labels: { style: { colors: 'var(--color-text-light)' } }, axisBorder: { color: 'var(--color-border)' }, axisTicks: { color: 'var(--color-border)' } },
        yaxis: { 
            min: 0, 
            max: 100, 
            labels: { 
                style: { colors: 'var(--color-text-light)' },
                formatter: val => Math.round(val)
            } 
        },
        colors: ['var(--color-primary)', 'var(--color-bg)'],
        title: { text: `Proportion de jeunes NEET - ${selectedCountry}`, style: { color: 'var(--color-primary)', fontWeight: 'bold' } },
        tooltip: { y: { formatter: val => val !== null && val !== undefined ? val.toFixed(2) + '%' : '' }, theme: 'dark' },
        plotOptions: { bar: { borderRadius: 5, columnWidth: '50%' } },
        legend: {
            show: true,
            labels: {
                colors: ['var(--color-primary)', '#000000']
            }
        },
        grid: { borderColor: 'var(--color-border)' }
    };
    if(chartYouthNEET) chartYouthNEET.destroy();
    chartYouthNEET = new ApexCharts(document.querySelector("#chartYouthNEET"), options);
    chartYouthNEET.render();
}
function createChartPieParliament() {
    const lastYear = 2024;
    // Correction : si la donnée est absente, on met 0
    const women = data.womenParliament[selectedCountry]?.[lastYear] ?? 0;
    const men = data.menParliament[selectedCountry]?.[lastYear] ?? 0;

    const total = women + men;
    if (total === 0) {
        document.getElementById('chartPieParliament').innerHTML = "<div style='text-align:center;color:#b57abf;padding:2em;'>Pas de données disponibles</div>";
        return;
    }

    const options = {
        chart: { height: 280, type: 'donut', toolbar: { show: false } },
        series: [women, men],
        labels: ['Femmes', 'Hommes'],
        colors: ['var(--color-primary)', 'var(--color-bg)'],
        title: { text: `Répartition femmes/hommes parlement - ${selectedCountry} (2024)`, style: { color: 'var(--color-primary)', fontWeight: 'bold' } },
        legend: {
            position: 'bottom',
            labels: {
                colors: ['var(--color-primary)', '#000000'],
                useSeriesColors: true
            }
        },
        tooltip: { y: { formatter: val => val !== null && val !== undefined ? val.toFixed(2) + '%' : '' }, theme: 'dark' }
    };
    if(chartPieParliament) chartPieParliament.destroy();
    chartPieParliament = new ApexCharts(document.querySelector("#chartPieParliament"), options);
    chartPieParliament.render();
}

// Radar pour le pays sélectionné (femmes uniquement)
function createChartRadar() {
    const values = [
        averageOverYears('womenParliament', selectedCountry),
        averageOverYears('secondaryCompletion', selectedCountry),
        averageOverYears('youthNEET', selectedCountry)
    ].map(v => v !== null && v !== undefined ? Number(v.toFixed(2)) : null);

    const series = [{
        name: selectedCountry,
        data: values
    }];
    const options = {
        chart: { 
            height: 600,
            type: 'radar', 
            toolbar: { show: false }, 
            animations: { enabled: true, easing: 'easeinout', speed: 600 },
            stroke: { width: 2 }
        },
        plotOptions: { radar: { polygons: { strokeColors: 'var(--color-border)', fill: { colors: ['var(--color-accent)', 'var(--color-accent)'] } } } },
        series,
        title: {
            text: `Comparaison radar des indicateurs - ${selectedCountry}`,
            align: 'center',
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'var(--color-primary)'
            }
        },
        colors: ['#a8c66c'],
        labels: ['Femmes en parlement (%)', 'Achèvement secondaire (%)', 'Jeunes NEET (%)'],
        xaxis: {
            labels: {
                style: {
                    colors: ['#000000', '#000000', '#000000'],
                    fontWeight: 'bold',
                }
            }
        },
        legend: { 
            position: 'bottom',
            labels: { colors: 'var(--color-primary)' } 
        },
        tooltip: { theme: 'dark', y: { formatter: val => val !== null && val !== undefined ? val.toFixed(2) + '%' : '' } },
        stroke: { width: 2 },
        fill: { opacity: 0.25 },
        yaxis: {
            show: true,
            min: 0,
            max: 100,
            tickAmount: 5,
            labels: {
                style: {
                    colors: ['#000000', '#000000', '#000000']
                }
            }
        }
    };
    if(chartRadar) chartRadar.destroy();
    chartRadar = new ApexCharts(document.querySelector("#chartRadar"), options);
    chartRadar.render();
}

    function getLatestYearData(category, country) {
      const years = Object.keys(data[category][country]);
      const sortedYears = years.sort((a, b) => b - a);
      for (let year of sortedYears) {
        const val = data[category][country][year];
        if (val !== null && val !== undefined) return Number(val.toFixed(2));
      }
      return 0;
    }

    function averageOverYears(category, country) {
      const values = Object.values(data[category][country]);
      const validValues = values.filter(v => v !== null && v !== undefined);
      if (validValues.length > 0) {
        return Number((validValues.reduce((a, b) => a + b) / validValues.length).toFixed(2));
      }
      return 0;
    }
    
    function createCompareRadar() {
      const radarColors = ['#8a307f', '#79a7d3', '#6883bc', '#d9a5b3', '#e75874', '#c4a35a'];
      const series = countries.map((c) => {
        const womenParliament = getLatestYearData('womenParliament', c);
        const secondaryCompletion = getLatestYearData('secondaryCompletion', c);
        const youthNEET = getLatestYearData('youthNEET', c);
        return {
          name: c,
          data: [womenParliament, secondaryCompletion, youthNEET].map(v => v !== null && v !== undefined ? v : 0)
        };
      });
      const options = {
        chart: {
          height: 600,
          type: 'radar',
          toolbar: { show: false },
          animations: { enabled: true, easing: 'easeinout', speed: 600 },
          stroke: { width: 2 }
        },
        plotOptions: {
          radar: {
            polygons: {
              strokeColors: 'var(--color-border)',
              fill: { colors: ['var(--color-accent)', 'var(--color-accent)'] }
            }
          }
        },
        series,
        title: {
          text: 'Comparaison radar des indicateurs par pays',
          align: 'center',
          style: { fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)' }
        },
        colors: radarColors,
        labels: ['Femmes en parlement (%)', 'Achèvement secondaire (%)', 'Jeunes NEET (%)'],
        legend: { position: 'bottom', labels: { colors: 'var(--color-primary)' } },
        tooltip: { theme: 'dark', y: { formatter: val => (val !== null && val !== undefined ? val.toFixed(2) + '%' : '') } },
        stroke: { width: 2 },
        fill: { opacity: 0.25 },
        xaxis: {
          labels: {
            style: { colors: ['#000000', '#000000', '#000000'], fontWeight: 'bold' }
          }
        },
        yaxis: {
          show: true,
          min: 0,
          max: 100,
          tickAmount: 5,
          labels: {
            style: { colors: ['#000000', '#000000', '#000000'], fontWeight: 'bold' }
          }
        }
      };
      if (compareRadar) compareRadar.destroy();
      compareRadar = new ApexCharts(document.querySelector("#compareRadar"), options);
      compareRadar.render();
    }

    function createCompareWomenMenParliament() {
      const womenData = countries.map(c => getLatestYearData('womenParliament', c));
      const menData = countries.map(c => getLatestYearData('menParliament', c));
      const series = [
        { name: 'Femmes', data: womenData },
        { name: 'Hommes', data: menData }
      ];
      const options = {
        chart: { height: 300, type: 'bar', stacked: true, toolbar: { show: false } },
        series,
        xaxis: {
          categories: countries,
          labels: { style: { colors: 'var(--color-text-light)' } },
          axisBorder: { color: 'var(--color-border)' },
          axisTicks: { color: 'var(--color-border)' }
        },
        yaxis: {
          labels: { style: { colors: 'var(--color-text-light)' }, formatter: val => Math.round(val) },
          min: 0,
          max: 100
        },
        colors: ['var(--color-primary)', 'var(--color-bg)'],
        title: { text: 'Femmes et Hommes en parlement par pays (données les plus récentes)', style: { color: 'var(--color-primary)', fontWeight: 'bold' } },
        tooltip: { y: { formatter: val => val.toFixed(2) + '%' }, theme: 'dark' },
        plotOptions: { bar: { borderRadius: 5, columnWidth: '40%' }, distributed: false },
        legend: {
          show: true,
          position: 'bottom',
          labels: { colors: ['var(--color-primary)', '#000000'] }
        },
        grid: { borderColor: 'var(--color-border)' }
      };
      if (compareWomenMenParliament) compareWomenMenParliament.destroy();
      compareWomenMenParliament = new ApexCharts(document.querySelector("#compareWomenMenParliament"), options);
      compareWomenMenParliament.render();
    }

    function createCompareSecondaryCompletion() {
  const womenData = countries.map(c => {
    const years = Object.keys(data.secondaryCompletion[c]);
    const sortedYears = years.sort((a, b) => b - a);
    for (let year of sortedYears) {
      const val = data.secondaryCompletion[c][year];
      if (val !== null && val !== undefined) return Number(val.toFixed(2));
    }
    return 0;
  });

  const menData = womenData.map(v => Number((100 - v).toFixed(2)));

  // Count valid points (>0) in women and men
  const validWomenCount = womenData.filter(v => v > 0).length;
  const validMenCount = menData.filter(v => v > 0).length;

  // Show chart only if at least 2 valid data points (more than one) 
  if ((validWomenCount + validMenCount) <= 2) {
    const container = document.getElementById('compareSecondaryCompletion');
    container.innerHTML = "<div style='text-align:center;color:#b57abf;padding:2em;'>Pas de données disponibles</div>";
    if (compareSecondaryCompletion) {
      compareSecondaryCompletion.destroy();
      compareSecondaryCompletion = null;
    }
    return;
  }

  const series = [
    { name: 'Femmes', data: womenData },
    { name: 'Hommes', data: menData }
  ];

  const options = {
    chart: { height: 300, type: 'bar', stacked: true, toolbar: { show: false } },
    series,
    xaxis: {
      categories: countries,
      labels: { style: { colors: 'var(--color-text-light)' } },
      axisBorder: { color: 'var(--color-border)' },
      axisTicks: { color: 'var(--color-border)' }
    },
    yaxis: {
      labels: { style: { colors: 'var(--color-text-light)' }, formatter: val => Math.round(val) },
      min: 0,
      max: 100
    },
    colors: ['var(--color-primary)', 'var(--color-bg)'],
    title: { text: 'Moyenne taux d’achèvement secondaire par pays (données les plus récentes)', style: { color: 'var(--color-primary)', fontWeight: 'bold' } },
    tooltip: { y: { formatter: val => val.toFixed(2) + '%' }, theme: 'dark' },
    plotOptions: { bar: { borderRadius: 5, columnWidth: '50%' } },
    legend: {
      show: true,
      position: 'bottom',
      labels: { colors: ['var(--color-primary)', '#000000'] }
    },
    grid: { borderColor: 'var(--color-border)' }
  };

  if (compareSecondaryCompletion) compareSecondaryCompletion.destroy();
  compareSecondaryCompletion = new ApexCharts(document.querySelector("#compareSecondaryCompletion"), options);
  compareSecondaryCompletion.render();
}

function createCompareYouthNEET() {
  const womenData = countries.map(c => {
    const years = Object.keys(data.youthNEET[c]);
    const sortedYears = years.sort((a, b) => b - a);
    for (let year of sortedYears) {
      const val = data.youthNEET[c][year];
      if (val !== null && val !== undefined) return Number(val.toFixed(2));
    }
    return 0;
  });

  const menData = womenData.map(v => Number((100 - v).toFixed(2)));

  const validWomenCount = womenData.filter(v => v > 0).length;
  const validMenCount = menData.filter(v => v > 0).length;

  if ((validWomenCount + validMenCount) <= 2) {
    const container = document.getElementById('compareYouthNEET');
    container.innerHTML = "<div style='text-align:center;color:#b57abf;padding:2em;'>Pas de données disponibles</div>";
    if (compareYouthNEET) {
      compareYouthNEET.destroy();
      compareYouthNEET = null;
    }
    return;
  }

  const series = [
    { name: 'Femmes', data: womenData },
    { name: 'Hommes', data: menData }
  ];

  const options = {
    chart: { height: 300, type: 'bar', stacked: true, toolbar: { show: false } },
    series,
    xaxis: {
      categories: countries,
      labels: { style: { colors: 'var(--color-text-light)' } },
      axisBorder: { color: 'var(--color-border)' },
      axisTicks: { color: 'var(--color-border)' }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        style: { colors: 'var(--color-text-light)' },
        formatter: val => Math.round(val)
      }
    },
    colors: ['var(--color-primary)', 'var(--color-bg)'],
    title: { text: 'Moyenne jeunes non scolarisés et sans emploi par pays (données les plus récentes)', style: { color: 'var(--color-primary)', fontWeight: 'bold' } },
    tooltip: { y: { formatter: val => val.toFixed(2) + '%' }, theme: 'dark' },
    plotOptions: { bar: { borderRadius: 5, columnWidth: '50%' } },
    legend: {
      show: true,
      position: 'bottom',
      labels: { colors: ['var(--color-primary)', '#000000'] }
    },
    grid: { borderColor: 'var(--color-border)' }
  };

  if (compareYouthNEET) compareYouthNEET.destroy();
  compareYouthNEET = new ApexCharts(document.querySelector("#compareYouthNEET"), options);
  compareYouthNEET.render();
}


// Mise à jour graphiques individuels pays
function updateCountryCharts() {
    clearCountryCharts();
    createChartWomenMenParliament();
    createChartSecondaryCompletion();
    createChartYouthNEET();
    createChartPieParliament();
    createChartRadar();
}
// Mise à jour graphiques comparaison pays
function updateCompareCharts() {
    clearCompareCharts();
    createCompareWomenMenParliament();
    createCompareSecondaryCompletion();
    createCompareYouthNEET();
    createCompareRadar();
}

// Gestion menu onglets + pays
const buttons = document.querySelectorAll('#countryMenu button');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if(btn.classList.contains('active')) return;
        document.querySelector('#countryMenu button.active').classList.remove('active');
        btn.classList.add('active');
        
        const tab = btn.getAttribute('data-tab');
        if(tab === 'country') {
            document.getElementById('chartsCountry').style.display = 'flex';
            document.getElementById('chartsCompare').style.display = 'none';
            selectedCountry = btn.getAttribute('data-country');
            const container = document.getElementById('chartsContainer');
            container.style.opacity = 0;
            setTimeout(() => {
                updateCountryCharts();
                container.style.opacity = 1;
            }, 300);
        } else if(tab === 'compare') {
            document.getElementById('chartsCountry').style.display = 'none';
            document.getElementById('chartsCompare').style.display = 'flex';
            const container = document.getElementById('chartsContainer');
            container.style.opacity = 0;
            setTimeout(() => {
                updateCompareCharts();
                container.style.opacity = 1;
            }, 300);
        }
    });
});

// Initialisation affichage comparaison par défaut
updateCompareCharts();