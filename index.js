let data = [];
let currentEditIndex = -1; 
window.onload = function() {
    const savedData = localStorage.getItem('studentGrades');
    if (savedData) {
        data = JSON.parse(savedData);
        afficher();
    }
};
function ajouter() {
    let nom = document.getElementById("nom").value;
    let cc1 = Number(document.getElementById("cc1").value);
    let cc2 = Number(document.getElementById("cc2").value);
    let cc3 = Number(document.getElementById("cc3").value);
    let efm = Number(document.getElementById("efm").value);
    let moy = ((cc1 + cc2 + cc3) / 3) * 0.33 + (efm * 0.67);
    let validation = "";
    
    if (moy >= 10) {
        validation = "validé";
    } else {
        validation = "non validé";
    }
    
    let stg = {
        nom: nom,
        cc1: cc1,
        cc2: cc2,
        cc3: cc3,
        efm: efm,
        moy: moy,
        validation: validation
    };
    
    if (currentEditIndex === -1) {
        data.push(stg);
    } else {
        data[currentEditIndex] = stg;
        currentEditIndex = -1;
    }
    
    saveToLocalStorage();
    afficher();
    
    document.getElementById("nom").value = "";
    document.getElementById("cc1").value = "";
    document.getElementById("cc2").value = "";
    document.getElementById("cc3").value = "";
    document.getElementById("efm").value = "";
}

function afficher() {
    let text = '';
    data.forEach((stg, i) => {
        text += `<tr>
            <td>${stg.nom}</td>
            <td>${stg.cc1}</td>
            <td>${stg.cc2}</td>
            <td>${stg.cc3}</td>
            <td>${stg.efm}</td>
            <td>${stg.moy.toFixed(2)}</td>
            <td>${stg.validation}</td>
            <td><button onclick="supprimer(${i})">Supprimer</button><button onclick="modifier(${i})">Modifier</button></td>
        </tr>`;
    });
    document.getElementById("tbody").innerHTML = text;
    let nbrStag = data.length;
    let nbrValide = data.filter(stg => stg.validation === "validé").length;
    let nbrNonValide = data.filter(stg => stg.validation === "non validé").length;
    let moyenneGenerale = data.reduce((acc, stg) => acc + stg.moy, 0) / nbrStag;
    document.getElementById("infos").innerHTML = `<span> stagaires:${nbrStag}</span>
            <span>Moyenne class:${moyenneGenerale.toFixed(2)}</span>
            <span>stg valide:${nbrValide}</span>
            <span>stg non valide:${nbrNonValide}</span>`
}

function supprimer(i) {
    data.splice(i, 1);
    saveToLocalStorage();
    afficher();
}

function modifier(i) {
    document.getElementById("nom").value = data[i].nom;
    document.getElementById("cc1").value = data[i].cc1;
    document.getElementById("cc2").value = data[i].cc2;
    document.getElementById("cc3").value = data[i].cc3;
    document.getElementById("efm").value = data[i].efm;
    
    currentEditIndex = i;
}

function saveToLocalStorage() {
    localStorage.setItem('studentGrades', JSON.stringify(data));
}