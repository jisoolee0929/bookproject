function App() {
  // 새로고침 떄 마다 시행
  this.init = () => {
    console.log(getCookie("modal-closed"));
    if (getCookie("modal-closed") === "true") {
      closeModal();
      return;
    }
    openModal();
  };

  // 책을 랜더링
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  scene.innerHeight = 500;
  const section = document.querySelector("#book");

  const cover = document.getElementById("cover").src;
  const back = document.getElementById("back").src;
  const spine = document.getElementById("spine").src;

  const ambient = new THREE.AmbientLight(0x222222);
  scene.add(ambient);

  const direct = new THREE.DirectionalLight(0xffffff);
  direct.position.set(0, 0, 6);
  scene.add(direct);

  const loader = new THREE.TextureLoader();

  const urls = [spine, spine, spine, spine, cover, back];

  const materials = urls.map((url) => {
    return new THREE.MeshLambertMaterial({
      color: 0xffffff,
      map: loader.load(url),
    });
  });

  const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);

  const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
  );
  camera.position.z = 6;
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  section.appendChild(renderer.domElement);
  function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x +=0.01;
    cube.rotation.y += 0.01;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  animate();

  // 모달을 생성

  const body = document.querySelector("body");
  const modal = document.querySelector(".modal-container");
  const close = document.querySelector(".modal-close");
  const neverSee = document.querySelector(".modal-stop-button");

  neverSee.addEventListener("click", () => {
    closeModal();
    setCookie("modal-closed", "true", 1);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  section.addEventListener("click", openModal);
  close.addEventListener("click", closeModal);

  function openModal() {
    modal.classList.add("open");
    body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    body.style.overflow = "auto";
  }

  //   쿠키를 생성
  function setCookie(name, value, expireDate) {
    let date = new Date();
    date.setDate(date.getDate() + expireDate);
    document.cookie = `${name}=${value};expires=${date.toGMTString()}`;
  }

  function getCookie(name) {
    let cookie = document.cookie;
    if (cookie) {
      let cookies = cookie.split("; ");
      for (let index in cookies) {
        let cookieName = cookies[index].split("=");
        if (cookieName[0] === name) {
          return cookieName[1];
        }
      }
    }
  }
}

const app = new App();

app.init();
