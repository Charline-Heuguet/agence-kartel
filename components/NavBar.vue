<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-0">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center my-4" id="navbarNavDropdown">
          <ul class="navbar-nav row">
            <li class="nav-item my-auto col">
              <NuxtLink class="nav-link m-2" to="/">Accueil</NuxtLink>
            </li>
            <li class="nav-item my-auto col">
              <NuxtLink class="nav-link m-2" to="/nos-articles">Nos articles</NuxtLink>
            </li>
            
            <li class="col d-lg-flex d-none">
              <a href="/">
                <img class="w-100" src="/assets/logo.svg" alt="logo">
              </a>
            </li>
            <li class="col d-lg-none d-block nav-item my-auto">
              <a class="nav-link m-2" href="/">Home</a>
            </li>
            <li class="nav-item my-auto col">
              <NuxtLink class="nav-link m-2" to="/podcast">Notre podcast</NuxtLink>
            </li>
            <li class="nav-item my-auto col">
              <NuxtLink class="nav-link m-2" to="/agence">L'agence</NuxtLink>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<style scoped>
.navbar{
  background: #ffffff !important;
}
.nav-link{
  font-size: large;
  color: black;
}

.nav-item:hover{
  text-decoration: underline #212ea5;
  text-underline-offset: 8px;
  text-decoration-thickness: 2px;
  color: #2c3e50;
}

@keyframes active-style{
  from{
      border-radius: 10px;
      background-color:  #ffffff;
  }
  to{
      border-radius: 50px;
      background-color: #212ea5;
  }
}


</style>
