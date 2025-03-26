<template>
    <div class=" mx-2 d-flex justify-content-center mt-3">
        <div class="row my-auto">
          <div class="col-4 d-none d-md-block mt-4">
            <div class="col-12 mb-4 mx-auto">
              <img src="/assets/icon/eye.svg" alt="">
            </div>
            <div class="col-12 mt-4 mx-auto">
              <img src="/assets/icon/paint.svg" alt="">
            </div>
          </div>

          <div class="col-12 col-md-6 mt-4">
            <div class="col-12 my-3 d-flex ms-5">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 30 30"
                fill="currentColor"
                stroke="None"
                stroke-width="0"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-more-horizontal align-middle"
              >
                <circle cx="15" cy="15" r="15" class="pill-bleu"></circle>
              </svg>
              <p class="mx-2">Spectateur</p>
            </div>
            <div class="col-12 my-3 d-flex ms-5">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 30 30"
                fill="currentColor"
                stroke="None"
                stroke-width="0"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-more-horizontal align-middle"
              >
                <circle cx="15" cy="15" r="15" class="pill-noir"></circle>
              </svg>
              <p class="mx-2">Nous</p>
            </div>
            <div class="col-12 my-3 d-flex ms-5">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 30 30"
                fill="currentColor"
                stroke="None"
                stroke-width="0"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-more-horizontal align-middle"
              >
                <circle cx="15" cy="15" r="15" class="pill-jaune"></circle>
              </svg>
              <p class="mx-2">Artistes</p>
            </div>
          </div>
        </div>
        <img src="/assets/logo.svg" alt="" style="width: 350px">
      </div>
</template>

<style scoped>
.pill-bleu {
  color: #212ea5;
}
.pill-noir {
  color: black;
}
.pill-jaune {
  color: #f6dc75;
}
</style>