document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

const handleError = () => {
  alert('Se ha presentado un error en la conexión con la data');
}

const getProjects = (callback) => {
  const foodRequest = new XMLHttpRequest();
  foodRequest.open('GET', `data.json`);
  foodRequest.onload = callback;
  foodRequest.onerror = handleError;
  foodRequest.send();
}

const showData = (data) => {
  const showProject = document.getElementById('container-project');
  showProject.innerHTML = '';
  Object.keys(data).forEach((id) => {
    const project = data[id];
    showProject.innerHTML += `
    <div class="col s12 project" id=${id}>
      <div class="col s12 title-project center">
        ${project.title}
      </div>
      <div class="col s12 img-project center-align">
        <img width="330px" src=${project.image} alt="imagen de Dashboard en dispositivos">
      </div>
      <div class="col s12 description">
        ${project.description}
      </div>
      <div>
        <div class="col s12 l6 center link-repo">
          <a href=${project.demo} target="_blank">Ver demo</a>
        </div>
        <div class="col s12 l6 center link-repo">
          <a href=${project.repo} target="_blank">Ver GitHub</a>
        </div>
      </div>
    </div>
    `  
  })
}

const selectProject = () => {
  getProjects(()=> {
    const dataProjects = JSON.parse(event.currentTarget.responseText);    
    const dashboard = document.getElementById('dashboard');
    const socialNetwork = document.getElementById('socialNetwork');
    const foodmap = document.getElementById('foodmap');
    const mdlinks = document.getElementById('mdlinks');
  
    dashboard.addEventListener('click', (e) => {
      e.preventDefault();        
      const filterProject = dataProjects.filter((project) => {
        return project.key === 'dashboard';
      })
      showData(filterProject);
    });

    socialNetwork.addEventListener('click', (e) => {
      e.preventDefault();        
      const filterProject = dataProjects.filter((project) => {
        return project.key === 'socialNetwork';
      })
      showData(filterProject);
    });

    foodmap.addEventListener('click', (e) => {
      e.preventDefault();        
      const filterProject = dataProjects.filter((project) => {
        return project.key === 'foodmap';
      })
      showData(filterProject);
    });

    mdlinks.addEventListener('click', (e) => {
      e.preventDefault();        
      const filterProject = dataProjects.filter((project) => {
        return project.key === 'mdlinks';
      })
      showData(filterProject);
    });
  })
}

selectProject();
