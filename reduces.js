/****************************************************
 * Reduces 
 ****************************************************/
function nbParMois(accumulateur, anife) {
    accumulateur[anife["naissance"]["mois"] - 1]++;
    return accumulateur;
}

function nbParAnneesMois(accumulateur, anife) {    
    let annee = anife["naissance"]["annee"];
    let mois = anife["naissance"]["mois"] - 1;

    if (!accumulateur[annee]) accumulateur[annee] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    accumulateur[annee][mois]++;

    return accumulateur;
}

function nbParMoisParGenre(accumulateur, anife){
    if (anife["genre"] == "M") accumulateur["Hommes"][anife["naissance"]["mois"] - 1]++;
    else accumulateur["Femmes"][anife["naissance"]["mois"] - 1]++;

    return accumulateur;
}

function nbParGenre(accumulateur, anife){
    if (anife["genre"] == "M") accumulateur["Hommes"]++;
    else accumulateur["Femmes"]++;

    return accumulateur;
}

function nbParAnnees(accumulateur, anife) {    
    let annee = anife["naissance"]["annee"];

    if (!accumulateur[annee]) accumulateur[annee] = 0;

    accumulateur[annee]++;

    return accumulateur;
}