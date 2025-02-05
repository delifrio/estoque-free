// Configuração do Firebase (Mantenha os seus dados aqui)
var firebaseConfig = {
    apiKey: "AIzaSyBVYne_VD1bv6Onf69elC2bpi3gCvcQUz4",
    authDomain: "delifrio-bf69e.firebaseapp.com",
    databaseURL: "https://delifrio-bf69e-default-rtdb.firebaseio.com/",
    projectId: "delifrio-bf69e",
    storageBucket: "delifrio-bf69e.appspot.com",
    messagingSenderId: "702116913715",
    appId: "1:702116913715:web:18641ac0b9f6a6661d7946",
    measurementId: "G-8KJTVY9QHR"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Criar referência global ao banco de dados
var database = firebase.database();

