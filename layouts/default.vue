<template>
    <div id="app">
        <header>
            <NavBar />
        </header>
        <main>
            <slot />
        </main>
        <footer class="footer">
            <div class="d-flex justify-content-center" >
              <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>    
              <p class="ps-5">© Copyright Kartel 2025</p>
            </div>
        </footer>
    </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  min-height: calc(100vh - 174px - 85px);
  max-width: 1140px;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 20px;
    margin-bottom: 1rem;
  }

  h2, h3, h4, h5, h6 {
    font-size: 18px;
    margin-bottom: 1rem;
  }

  p {
    font-size: 16px;
    margin-bottom: 1rem;
  }

}

/* Largeur */
::-webkit-scrollbar {
  width: 10px;
}

/* Couleur de fond */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Couleur de la poignée */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

/* Effet de survol */
::-webkit-scrollbar-thumb:hover {
  background: #2a2a2a;
}

.footer{
    background-color: #212ea5;;
    color: white;
    padding: 30px 30px 15px 30px;
    clear: both;
    width: 100%;
    bottom: 0;
    height: auto;
}
a{
  text-decoration: none;
  color: white;
}
</style>