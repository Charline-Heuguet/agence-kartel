<template>
  <div class="container mb-5">
    <h1 class="police my-3">L'Agence</h1>

    <logoKartel />

    <p class="presentation" style="width: 50%">L’agence Kartel, c’est nous, un groupe de jeunes avec la soif d’expériences. Nous avons tous
      des compétences et parcours différents, mais un point commun : une sensibilité au monde de l’art. <br><br>Fondée
      en 2021, l'association Kartel s'engage résolument dans la médiation et la vulgarisation culturelle. Animés par une
      passion commune pour l'art, nous croyons en son pouvoir unificateur et enrichissant pour la société. Notre mission
      est de rendre l'art accessible à tous, de démystifier ses complexités et d'encourager la créativité sous toutes
      ses formes. Convaincus que chaque individu mérite l'opportunité de s'exprimer artistiquement, nous mettons en
      place des initiatives variées telles que des expositions, des ateliers, et des événements culturels. À travers
      notre engagement, nous aspirons à nourrir une communauté inclusive et vibrante, où la diversité artistique est
      célébrée et partagée.</p>

    <div class="row my-5">
      <div class="col-5 my-auto">
        <div class="line"></div>
      </div>
      <div class="col-2 my-auto p-0 mx-auto">
        <p class="pill-bleu mb-0 police fs-3">Notre Influence</p>
      </div>
      <div class="col-5 my-auto">
        <div class="line"></div>
      </div>
    </div>

    <div class="row justify-content-center mb-3">
      <img src="/assets/images/nuit_etoile.webp" alt="" style="width: 350px" class="mx-3 h-100 col-12 col-md-6">
      <div class="my-auto mx-3 col-12 col-md-6">
        <h2 class="pill-bleu mb-3 mb-md-5 mt-3 mt-md-0 d-flex justify-content-start police">Nuit étoilée</h2>
        <p class="presentation">La nuit étoilée représente ce que Van Gogh pouvait voir ou extrapoler de la chambre qu'il
          occupait lors de son séjour à l'asile de St Rémy de Provence. C'est à cette période difficile de sa vie
          tourmentée qu'il peint l'une des toiles les plus célèbres de l'histoire de l'art, aujourd'hui conservée au
          MoMA à New York.</p>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="my-auto mx-3 col-12 col-md-6">
        <h2 class="pill-bleu mb-3 mb-md-5 mt-3 mt-md-0 d-flex justify-content-start police">Van Gogh</h2>
        <p class="presentation">Vincent Van Gogh est né en 1853 aux Pays-Bas et mort en 1890 en France. C’est un peintre
          et dessinateur néerlandais. Son œuvre pleine de naturalisme, inspirée par l'impressionnisme et le
          pointillisme, annonce le fauvisme et l'expressionnisme. Il est aujourd'hui considéré comme l'un des plus
          grands artistes de tous les temps.</p>
      </div>
      <img src="/assets/images/vg.webp" alt="" style="width: 330px;"
        class="mx-3 col-12 col-md-6 order-first order-md-last">
    </div>

    <div class="row my-5">
      <div class="col-5 my-auto">
        <div class="line"></div>
      </div>
      <div class="col-2 my-auto p-0 mx-auto">
        <p class="pill-bleu mb-0 police fs-3">Les fondateurs</p>
      </div>
      <div class="col-5 my-auto">
        <div class="line"></div>
      </div>
    </div>

    <div class="row my-3">
      <div class="col mx-2">
        <div class="card">
          <img src="/assets/images/rubs.webp" class="rounded-circle" alt="...">
          <div class="card-body">
            <h5 class="card-title pill-bleu police">Ruben-Levy Konan</h5>
          </div>
        </div>
      </div>
      <div class="col mx-2">
        <div class="card">
          <img src="/assets/images/emy.webp" class="rounded-circle" alt="...">
          <div class="card-body">
            <h5 class="card-title pill-bleu police">Emily Archer</h5>
          </div>
        </div>
      </div>
      <div class="col mx-2">
        <div class="card">
          <img src="/assets/images/telmo.webp" class="rounded-circle" alt="...">
          <div class="card-body">
            <h5 class="card-title pill-bleu police">Telma Esmery</h5>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
useHead({
  title: 'L\'Agence Kartel',
  meta: [
    {
      name: 'description',
      content: 'Découvrez l\'agence Kartel, une association dédiée à la médiatisation et à la vulgarisation culturelle.'
    }
  ]
});
</script>

<style scoped>
.police {
  font-family: 'Lettown Hills';
  font-weight: 900 !important;
}

.presentation{
  margin: 0 auto;
  text-align: justify;
}

.card {
  border: none;
img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 0 auto;
  box-shadow: 3px 6px 6px rgb(0 0 0 / 10%);
}
}

.card 

.line {
  border-top: 2px solid #f6dc75 !important;
  border-top-width: 2px !important;
  border-top-style: solid !important;
  border-top-color: #f6dc75 !important;
}
.pill-bleu {
  color: #212ea5;
}
</style>
