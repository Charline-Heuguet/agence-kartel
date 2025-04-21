<template>
    <div>
        <h1>Les mentions légales</h1>
        <h2>Éditeur du site</h2>
        <p>Le présent site internet est édité par <strong>L’agence Kartel</strong>, association régie par la loi du 1er
            juillet 1901.</p>
        <p><strong>Nom de l'association</strong> : L'agence Kartel</p>
        <p><strong>Statut juridique</strong> : Association loi 1901</p>
        <p><strong>Adresse e-mail</strong> : agencekartel@gmail.com</p>

        <h2>Hébergement</h2>
        <p>Le site est hébergé par <strong>Vercel Inc.</strong>:</p>
        <p>
            440 N Barranca Ave #4133<br>
            Covina, CA 91723<br>
            États-Unis<br>
            Site web : <NuxtLink to="https://vercel.com">Vercel</NuxtLink></p>

        <p>Le nom de domaine est enregistré auprès de <strong>OVH SAS</strong>, 2 rue Kellermann, 59100 Roubaix, France.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>L’ensemble des contenus présents sur ce site (textes, images, graphismes, logos, vidéos, etc.) sont, sauf
            mentions contraires, la propriété exclusive de <strong>L’agence Kartel</strong>.</p>
        <p>Toute reproduction, représentation, diffusion ou utilisation, même partielle, sans autorisation préalable
            écrite est interdite.</p>

        <h2>Responsabilité</h2>
        <p>L’agence Kartel met tout en œuvre pour assurer l’exactitude et la mise à jour des informations diffusées sur
            ce site. Toutefois, elle ne saurait être tenue responsable des éventuelles erreurs ou omissions.</p>

        <h2>Données personnelles</h2>
        <p>Conformément à la législation en vigueur, notamment le Règlement Général sur la Protection des Données
            (RGPD), vous disposez d’un droit d’accès, de rectification et de suppression des données vous concernant.
        </p>
        <p>Pour toute demande, vous pouvez contacter : agencekartel@gmail.com</p>

    </div>
</template>

<script setup>
useHead({
    title: 'Mentions légales - Kartel',
    meta: [
        {
            name: 'description',
            content: 'Découvrez les mentions légales de Kartel, votre passerelle vers une exploration dynamique de la culture sous toutes ses formes !'
        }
    ]
});
</script>
<style scoped>
h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
}
h2 {
    font-size: 2rem;
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: left;
}
p {
    font-size: 1.2rem;
    text-align: left;
}
a {
    color: #2c3e50;
    text-decoration: none;
}
</style>