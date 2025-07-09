// Récupérer les couleurs CSS
const styles = getComputedStyle(document.documentElement);
const radarColors = styles.getPropertyValue('--radar-colors').split(',').map(c => c.trim());
const colorPrimary = styles.getPropertyValue('--color-primary').trim();
const colorPrimaryLight = styles.getPropertyValue('--color-primary-light').trim();
const colorBorder = styles.getPropertyValue('--color-border').trim();

// Mapping unique de couleur par pays
const countryColorsMap = {};
function getCountryColor(country) {
    if (!countryColorsMap[country]) {
        const index = Object.keys(countryColorsMap).length % radarColors.length;
        countryColorsMap[country] = radarColors[index];
    }
    return countryColorsMap[country];
}

function averagePercent(arr) {
    const total = arr.reduce((sum, e) => sum + e.percent, 0);
    return total / arr.length;
}

// Traductions
function translateUrbanization(area) {
    if (area.toLowerCase() === "urban") return "Urbain";
    if (area.toLowerCase() === "rural") return "Rural";
    return area;
}

function translateAgeGroup(ageGroup) {
    if (ageGroup === "15–24" || ageGroup === "15-24") return "15–24 ans";
    if (ageGroup === "25–54" || ageGroup === "25-54") return "25–54 ans";
    return ageGroup;
}

function translateEducation(education) {
    const mapEdu = {
        "Lower secondary": "Secondaire inférieur",
        "Upper secondary": "Secondaire supérieur",
        "Tertiary": "Tertiaire",
        "Lower secondary (not stated)": "Secondaire inférieur (non précisé)"
    };
    return mapEdu[education] || education;
}

// 1. Vue d'ensemble par pays
function drawCountryOverview() {
    const countries = [...new Set(femaleEmploymentOverview.map(e => e.country))];
    const avgByCountry = countries.map(country => {
        const data = femaleEmploymentOverview.filter(e => e.country === country);
        return Math.round(averagePercent(data));
    });

    const options = {
        chart: {
            type: 'donut',
            width: 400,
            events: {
                dataPointSelection(event, chartContext, config) {
                    const index = config.dataPointIndex;
                    const selectedCountry = countries[index];
                    drawUrbanizationChart(selectedCountry);
                }
            }
        },
        labels: countries,
        series: avgByCountry,
        title: {
            text: "Emploi féminin moyen par pays",
            style: { color: colorPrimary }
        },
        colors: countries.map(c => getCountryColor(c)),
        legend: {
            position: 'bottom',
            fontSize: '13px',
            labels: { colors: colorPrimaryLight }
        }
    };

    clearChart(2);
    clearChart(3);
    clearChart(4);
    new ApexCharts(document.querySelector("#chart1"), options).render();
}

// 2. Urbanisation
function drawUrbanizationChart(country) {
    const data = managersByUrbanization.filter(e => e.country === country);
    if (data.length === 0) {
        document.querySelector("#chart2").innerHTML = `<p>Pas de données sur l’urbanisation pour ${country}</p>`;
        clearChart(3);
        clearChart(4);
        return;
    }

    const labels = data.map(e => `${translateUrbanization(e.area)} (${e.year})`);
    const series = data.map(e => e.percent);

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            events: {
                dataPointSelection(event, chartContext, config) {
                    drawAgeGroupChart(country);
                    drawEducationChart(country);
                }
            }
        },
        series: [{ name: country, data: series }],
        xaxis: {
            categories: labels,
            labels: {
                style: {
                    fontSize: '13px',
                    colors: colorPrimaryLight
                }
            }
        },
        yaxis: {
            max: 100,
            labels: {
                formatter: val => Math.round(val)
            }
        },
        title: { text: `Managers féminins selon l’urbanisation à ${country}`, style: { color: colorPrimary } },
        colors: [getCountryColor(country)],
        dataLabels: {
            enabled: true,
            style: { fontSize: '12px', colors: [colorPrimary] }
        },
        stroke: { colors: [colorBorder] },
        legend: {
            position: 'bottom',
            fontSize: '13px',
            labels: { colors: colorPrimaryLight }
        }
    };

    clearChart(3);
    clearChart(4);
    new ApexCharts(document.querySelector("#chart2"), options).render();

    drawAgeGroupChart(country);
    drawEducationChart(country);
}

// 3. Tranche d’âge
function drawAgeGroupChart(country) {
    const data = managersByAgeGroup.filter(e => e.country === country);
    if (data.length === 0) {
        document.querySelector("#chart3").innerHTML = `<p>Pas de données par tranche d’âge pour ${country}</p>`;
        return;
    }

    const labels = data.map(e => `${translateAgeGroup(e.ageGroup)} (${e.year})`);
    const series = data.map(e => e.percent);

    const options = {
        chart: {
            type: 'polarArea',
            height: 350
        },
        series: series,
        labels: labels,
        title: {
            text: `Managers féminins par tranche d’âge à ${country}`,
            style: { color: colorPrimary }
        },
        fill: { opacity: 0.9 },
        stroke: { width: 1, colors: [colorBorder] },
        legend: {
            position: 'bottom',
            fontSize: '13px',
            labels: { colors: colorPrimaryLight }
        },
        theme: {
            monochrome: {
                enabled: true,
                color: getCountryColor(country),
                shadeTo: 'light',
                shadeIntensity: 0.6
            }
        }
    };

    new ApexCharts(document.querySelector("#chart3"), options).render();
}

// 4. Niveau d’éducation
function drawEducationChart(country) {
    const data = managersByEducation.filter(e => e.country === country);
    if (data.length === 0) {
        document.querySelector("#chart4").innerHTML = `<p>Pas de données sur le niveau d’éducation pour ${country}</p>`;
        return;
    }

    const labels = data.map(e => `${translateEducation(e.education)} (${translateUrbanization(e.urbanization)}, ${e.year})`);
    const series = data.map(e => e.percent);

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        series: [{ name: country, data: series }],
        xaxis: {
            categories: labels,
            labels: {
                style: {
                    fontSize: '13px',
                    colors: colorPrimaryLight
                }
            }
        },
        yaxis: {
            max: 100,
            labels: {
                formatter: val => Math.round(val)
            }
        },
        title: {
            text: `Managers féminins par niveau d’éducation à ${country}`,
            style: { color: colorPrimary }
        },
        colors: [getCountryColor(country)],
        dataLabels: {
            enabled: true,
            style: { fontSize: '12px', colors: [colorPrimary] }
        },
        stroke: { colors: [colorBorder] },
        legend: {
            position: 'bottom',
            fontSize: '13px',
            labels: { colors: colorPrimaryLight }
        }
    };

    new ApexCharts(document.querySelector("#chart4"), options).render();
}

// Nettoyage
function clearChart(num) {
    document.querySelector(`#chart${num}`).innerHTML = "";
}

// Initialisation automatique avec Fidji
drawCountryOverview();
