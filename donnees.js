/****************************************************
* Données
****************************************************/

const data = {
    womenParliament: {
        'Fidji': {2014: null, 2015: 14, 2016: 16, 2017: 16, 2018: 16, 2019: 19.61, 2020: 19.61, 2021: 21.57, 2022: 19.61, 2023: 10.91, 2024: 9.09},
        'Nouvelle-Calédonie': {2014: null, 2015: null, 2016: null, 2017: 44.4, 2018: null, 2019: 51.9, 2020: null, 2021: null, 2022: null, 2023: null, 2024: null},
        'Papouasie-Nouvelle-Guinée': {2014: 2.7, 2015: 2.7, 2016: 2.7, 2017: 2.7, 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 0, 2023: 1.74, 2024: 2.7},
        'Kiribati': {2014: 8.7, 2015: 8.7, 2016: 6.52, 2017: 6.52, 2018: 6.52, 2019: 6.52, 2020: 6.62, 2021: 6.67, 2022: 6.67, 2023: 6.67, 2024: 6.67},
        'Tonga': {2014: 3.57, 2015: 0, 2016: 0, 2017: 3.85, 2018: 7.41, 2019: 7.41, 2020: 7.41, 2021: 7.41, 2022: 3.7, 2023: 7.14, 2024: 7.14}
    },
     menParliament: {
        'Fidji': {2014: null, 2015: 86, 2016: 84, 2017: 84, 2018: 84, 2019: 80.39, 2020: 80.39, 2021: 78.43, 2022: 80.39, 2023: 89.39, 2024: 90.91},
        'Nouvelle-Calédonie': {2014: null, 2015: null, 2016: null, 2017: 55.6, 2018: null, 2019: 48.1, 2020: null, 2021: null, 2022: null, 2023: null, 2024: null},
        'Papouasie-Nouvelle-Guinée': {2014: 97.3, 2015: 97.3, 2016: 97.3, 2017: 97.3, 2018: 100, 2019: 100, 2020: 100, 2021: 100, 2022: 100, 2023: 98.26, 2024: 97.3},
        'Kiribati': {2014: 91.3, 2015: 91.3, 2016: 93.48, 2017: 93.48, 2018: 93.48, 2019: 93.48, 2020: 93.48, 2021: 93.33, 2022: 93.33, 2023: 93.33, 2024: 93.33},
        'Tonga': {2014: 96.43, 2015: 100, 2016: 100, 2017: 96.15, 2018: 92.59, 2019: 92.59, 2020: 92.59, 2021: 92.59, 2022: 96.3, 2023: 92.86, 2024: 92.86}
    },
    secondaryCompletion: {
        'Fidji': {2014: 81.4, 2015: 82, 2016: 82.8, 2017: 83.7, 2018: 84.6, 2019: 85.4, 2020: 85.9, 2021: 54.57, 2022: null, 2023: null, 2024: null},
        'Nouvelle-Calédonie': {2014: null, 2015: null, 2016: null, 2017: null, 2018: null, 2019: null, 2020: null, 2021: null, 2022: null, 2023: null, 2024: null},
        'Papouasie-Nouvelle-Guinée': {2014: 11.4, 2015: 11.7, 2016: 12, 2017: 12.2, 2018: 16.89, 2019: 12.4, 2020: 12.5, 2021: null, 2022: null, 2023: null, 2024: null},
        'Kiribati': {2014: 13.79, 2015: 14.44, 2016: 15.19, 2017: 16, 2018: 16.73, 2019: 18.84, 2020: null, 2021: null, 2022: null, 2023: null, 2024: null},
        'Tonga': {2014: null, 2015: null, 2016: null, 2017: null, 2018: null, 2019: null, 2020: null, 2021: null, 2022: null, 2023: null, 2024: null}
    },
    youthNEET: {
        'Fidji': {2014: 27.32, 2015: null, 2016: 29.59, 2017: null, 2018: null, 2019: null, 2020: null, 2021: null, 2022: null, 2023: null, 2024: null},
        'Nouvelle-Calédonie': {2014: 12.22, 2015: null, 2016: null, 2017: 41.97, 2018: 32.37, 2019: 28.88, 2020: 32.53, 2021: null, 2022: 24.39, 2023: null, 2024: null},
        'Papouasie-Nouvelle-Guinée': {2014: null, 2015: null, 2016: null, 2017: null, 2018: null, 2019: null, 2020: null, 2021: null, 2022: 31.17, 2023: null, 2024: null},
        'Kiribati': {2014: null, 2015: 47.6, 2016: null, 2017: null, 2018: null, 2019: 50.43, 2020: 55.85, 2021: null, 2022: null, 2023: null, 2024: null},
        'Tonga': {2014: null, 2015: null, 2016: null, 2017: null, 2018: 30.39, 2019: null, 2020: null, 2021: 23.28, 2022: null, 2023: null, 2024: null}
    }
};

const femaleEmploymentOverview = [
      { country: "Fiji", year: 2015, percent: 30.4 },
      { country: "Fiji", year: 2023, percent: 38.9 },
      { country: "Kiribati", year: 2019, percent: 40.24 },
      { country: "Tonga", year: 2019, percent: 41.56 },
      { country: "Tonga", year: 2020, percent: 35.8 }
    ];

    const managersByUrbanization = [
      { country: "Kiribati", year: 2019, area: "Urban", percent: 43.1 },
      { country: "Kiribati", year: 2019, area: "Rural", percent: 35.1 },
      { country: "Tonga", year: 2021, area: "Urban", percent: 45.9 },
      { country: "Tonga", year: 2021, area: "Rural", percent: 31.8 }
    ];

    const managersByAgeGroup = [
      { country: "Kiribati", ageGroup: "15–24", year: 2019, percent: 34.3 },
      { country: "Kiribati", ageGroup: "25–54", year: 2019, percent: 41.5 },
      { country: "Tonga", ageGroup: "25–54", year: 2021, percent: 42.5 }
    ];

    const managersByEducation = [
      { country: "Kiribati", education: "Lower secondary", urbanization: "National", year: 2019, percent: 44.9 },
      { country: "Kiribati", education: "Upper secondary", urbanization: "Urban", year: 2019, percent: 25.9 },
      { country: "Kiribati", education: "Tertiary", urbanization: "Urban", year: 2019, percent: 39.7 },
      { country: "Tonga", education: "Tertiary", urbanization: "Urban", year: 2021, percent: 60.4 },
      { country: "Tonga", education: "Upper secondary", urbanization: "Urban", year: 2021, percent: 40.1 },
      { country: "Tonga", education: "Lower secondary (not stated)", urbanization: "Rural", year: 2021, percent: 53.3 }
    ];