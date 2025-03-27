<template>
  <div class="home mt-2">
    <div class="title py-5 d-block">
      <h1 class="art police">
        "L'art est inutile, c'est pour ça qu'il est essentiel."
      </h1>
      <span class="kartel">
        Le groupe Kartel
      </span>
    </div>
    <img src="/assets/images/nuit_etoile.webp" class="w-25 nuit" alt="nuit">
    <div class="container">
      <div class="d-flex jsutify-content-center mt-5 mx-5">
        <p>Bienvenue sur la page d'accueil de Kartel, votre passerelle vers une exploration dynamique de la culture sous
          toutes ses formes ! En tant qu'association dévouée à la médiatisation et à la vulgarisation culturelle, nous
          sommes ici pour vous guider à travers un voyage passionnant où l'art, la musique, la littérature, et bien plus
          encore, prennent vie. Avec une équipe dédiée de passionnés, nous sommes fiers de vous offrir une plateforme où
          la découverte et l'enrichissement intellectuel se rencontrent. Préparez-vous à être inspiré, éduqué et
          divertis, car chez Kartel, la culture est bien plus qu'une simple expérience, c'est une aventure à partager
          ensemble. Bienvenue dans notre univers culturel !</p>
      </div>
    </div>
  </div>
  <div class="line col-4 mx-auto my-5"></div>
  <p class="mx-auto">N'hésitez pas à nous suivre sur nos réseaux sociaux pour ne rien perdre de nos dernères actualités !</p>
  <div class="wrapper">
    <div class="button">
      <div class="icon">
        <a href="https://www.instagram.com/agencekartel/" target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
    <div class="button">
      <div class="icon">
        <a href="https://open.spotify.com/show/0Z8uFOMqqQnV4yIIo0l8dY" target="_blank">
          <i class="fa-brands fa-spotify"></i>
        </a>
      </div>
    </div>
    <div class="button">
      <div class="icon">
        <a href="https://youtube.com/@KartelAgence?si=ljVQ38KfnpjAatFr" target="_blank">
          <i class="fab fa-youtube"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
useHead({
  title: 'Kartel',
  meta: [
    {
      name: 'description',
      content: 'Bienvenue sur la page d\'accueil de Kartel, votre passerelle vers une exploration dynamique de la culture sous toutes ses formes !'
    }
  ]
})
</script>
<style scoped>
a {
  color: #2c3e50
}

.title {
  text-align: center;
  width: 100%;
  background-color: #f6dc75;
}

.title .art .kartel {
  text-transform: uppercase;
  display: block;
}

.police {
  font-family: 'Lettown Hills';
  font-weight: 900 !important;
}

.art {
  animation: text 2s 1;
  background-color: #f6dc75;
  position: relative;
}

.kartel {
  font-size: 20px;
}

@keyframes text {
  0% {
    color: black;
    margin-bottom: -40px;
  }

  50% {
    margin-bottom: -40px;
  }
}

.nuit {
  position: relative;
  margin-top: -30px;
}

.pill-bleu {
  color: #212ea5;
}

.line {
  text-align: center;
  border-top: 2px solid #f6dc75 !important;
  border-top-width: 2px !important;
  border-top-style: solid !important;
  border-top-color: #f6dc75 !important;
}

.wrapper {
  margin-bottom: 50px;
}
.wrapper .button {
  display: inline-block;
  height: 60px;
  width: 60px;
  margin: 0 5px;
  overflow: hidden;
  background: #fff;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
}

.wrapper .button .icon {
  display: inline-block;
  height: 60px;
  width: 60px;
  text-align: center;
  border-radius: 50px;
  box-sizing: border-box;
  line-height: 60px;
  transition: all 0.3s ease-out;
}

.wrapper .button:nth-child(1):hover .icon {
  background: #E1306C;
}

.wrapper .button:nth-child(2):hover .icon {
  background:#1bd760;
}

.wrapper .button:nth-child(3):hover .icon {
  background: #ff0000;
}

.wrapper .button .icon i {
  font-size: 25px;
  line-height: 60px;
  transition: all 0.3s ease-out;
}

.wrapper .button:hover .icon i {
  color: #fff;
}
</style>