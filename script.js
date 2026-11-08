const main_page = document.querySelector("main");
const definition_page = document.getElementById("definition-page");
const ukraine_page = document.getElementById("ukraine-page");
const comparison_page = document.getElementById("comparison-page");
const about_page = document.getElementById("about-page");

const home_button = document.getElementById("home-button");

home_button.addEventListener("click", function() {
    main_page.hidden = false;
    definition_page.hidden = true;
    ukraine_page.hidden = true;
    comparison_page.hidden = true;
    about_page.hidden = true;

    home_button.classList.add("active");
    about_button.classList.remove("active");
});

const about_button = document.getElementById("about-button");

about_button.addEventListener("click", function() {
    main_page.hidden = true;
    definition_page.hidden = true;
    ukraine_page.hidden = true;
    comparison_page.hidden = true;
    about_page.hidden = false;

    about_button.classList.add("active");
    home_button.classList.remove("active");
});

const back_button = document.getElementById("back-home");

back_button.addEventListener("click", function() {
    main_page.hidden = false;
    definition_page.hidden = true;
    ukraine_page.hidden = true;
    comparison_page.hidden = true;
    about_page.hidden = true;
});

const button_definition = document.getElementById("definition");

button_definition.addEventListener("click", function() {
    main_page.hidden = true;
    ukraine_page.hidden = true;
    comparison_page.hidden = true;
    about_page.hidden = true;
    definition_page.hidden = false;
});

const back_ukraine_button = document.getElementById("back-ukraine");

back_ukraine_button.addEventListener("click", function() {
    main_page.hidden = false;
    ukraine_page.hidden = true;
    comparison_page.hidden = true;
    definition_page.hidden = true;
    about_page.hidden = true;
});

const button_ukraine = document.getElementById("ukraine");

button_ukraine.addEventListener("click", function() {
    main_page.hidden = true;
    comparison_page.hidden = true;
    definition_page.hidden = true;
    about_page.hidden = true;
    ukraine_page.hidden = false;
});

const back_comparison_button = document.getElementById("back-comparison");

back_comparison_button.addEventListener("click", function() {
    main_page.hidden = false;
    ukraine_page.hidden = true;
    definition_page.hidden = true;
    about_page.hidden = true;
    comparison_page.hidden = true;
});

const button_comparison = document.getElementById("comparison");

button_comparison.addEventListener("click", function() {
    main_page.hidden = true;
    comparison_page.hidden = false;
    definition_page.hidden = true;
    about_page.hidden = true;
    ukraine_page.hidden = true;
});

const compare_button = document.getElementById("compare");

compare_button.addEventListener("click", function() {
    const country1 = document.getElementById("country-select-1").value;
    const country2 = document.getElementById("country-select-2").value;

    if (country1 === "" || country2 === "") {
        alert("Спочатку виберіть дві країни!");
        return;
    }

    if (country1 === country2) {
        alert("Не можна порівнювати однакові країни!");
        return;
    }

    const first = countries[country1];
    const second = countries[country2];

    document.getElementById("country-1-name").textContent = first.name;
    document.getElementById("country-2-name").textContent = second.name;

    const indicators = {
        crops: "Рослинництво",
        livestock: "Тваринництво",
        forestry: "Лісове господарство",
        fishing: "Рибне господарство",
        mining: "Добувна промисловість"
    };

    const tableBody = document.getElementById("comparison-body");

    tableBody.innerHTML = "";

    for (const key in indicators) {
        const row = document.createElement("tr");

        const indicatorCell = document.createElement("td");
        indicatorCell.textContent = indicators[key];

        const firstCell = document.createElement("td");
        firstCell.textContent = first[key];

        const secondCell = document.createElement("td");
        secondCell.textContent = second[key];

        row.appendChild(indicatorCell);
        row.appendChild(firstCell);
        row.appendChild(secondCell);

        tableBody.appendChild(row);
    }

    document.getElementById("comparison-results").hidden = false;
});

const worldMap = document.getElementById("world-map");

worldMap.addEventListener("load", function() {
    const svgDocument = worldMap.contentDocument;

    if (!svgDocument) {
        console.log("Не вдалося отримати доступ до SVG");
        return;
    }

    console.log("🌍 SVG-карта завантажена!");

    const countriesOnMap = svgDocument.querySelectorAll("[id]");

    console.log("Елементів з ID:", countriesOnMap.length);

    const ids = Array.from(countriesOnMap).map(element => element.id);

    console.log("ID елементів карти:", ids);

    const countryIds = ["ua", "de", "us", "cn", "fr"];

    function updateMapColors() {
        const first = document.getElementById("country-select-1").value;
        const second = document.getElementById("country-select-2").value;

        const countryNames = {
            ua: "ukraine",
            de: "germany",
            us: "usa",
            cn: "china",
            fr: "france"
        };

        countryIds.forEach(function(id) {
            const country = svgDocument.getElementById(id);

            if (!country) return;

            const name = countryNames[id];

            if (name === first) {
                country.style.fill = "#2dd4bf";
            } else if (name === second) {
                country.style.fill = "#fbbf24";
            } else {
                country.style.fill = "#55c8ff";
            }
        });
    }

    countryIds.forEach(function(id) {
        const country = svgDocument.getElementById(id);

        if (country) {
            country.style.fill = "#55c8ff";
            country.style.cursor = "pointer";

            country.addEventListener("click", function() {
                console.log("Натиснуто на країну:", id);

                const countryNames = {
                    ua: "ukraine",
                    de: "germany",
                    us: "usa",
                    cn: "china",
                    fr: "france"
                };

                const selectedCountry = countryNames[id];

                const select1 = document.getElementById("country-select-1");
                const select2 = document.getElementById("country-select-2");

                if (select1.value === selectedCountry) {
                    return;
                }

                if (select2.value === selectedCountry) {
                    return;
                }

                if (select1.value === "") {
                    select1.value = selectedCountry;
                } else {
                    select2.value = selectedCountry;
                }
                updateMapColors();
            });

                console.log("Знайдено країну:", id);
            } else {
                console.log("Країну не знайдено:", id);
            }
        });

        document.getElementById("country-select-1")
            .addEventListener("change", updateMapColors);

        document.getElementById("country-select-2")
            .addEventListener("change", updateMapColors);

        updateMapColors();
    });