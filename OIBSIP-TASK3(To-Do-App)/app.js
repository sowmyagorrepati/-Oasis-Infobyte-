let tasks = [];

document.getElementById("newtask").addEventListener("click", function(e) {
  e.preventDefault();

  addtask();
});

const addtask = () => {
  const taskinput = document.getElementById("taskinput");
  const text = taskinput.value;

  if (text) {
    tasks.push({ text: text, completed: false });

    updatelist();
    updatestatus();
    savetask();

    taskinput.value = ''; // clear the input field
  }
};

const updatelist = () => {
    const taskitems = document.getElementById("taskitems"); // get the ul element
    taskitems.innerHTML = ''; // clear the list
  
    tasks.forEach((task, index) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <div class="task-items">
          <div class="task">
            <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
            <p class="${task.completed ? 'completed' : ''}">${task.text}</p>
          </div>
          <div class="icons">
             <img src="./images/edit.png" alt="" onclick="edit(${index})">
             <img src="./images/bin.png" alt="" onclick="bin(${index})">   
          </div>
        </div>
      `;
  
      item.querySelector('input[type="checkbox"]').addEventListener("change", () => {
        task.completed = !task.completed;
        updatelist();
        updatestatus();
        savetask();
      });
  
      taskitems.appendChild(item); 
    });
  };
  

const bin = (index) => {
    tasks.splice(index, 1);
    updatelist();
    updatestatus();
    savetask();
};

const edit = (index) => {
    const taskinput = document.getElementById('taskinput');
    taskinput.value = tasks[index].text;

    tasks.splice(index, 1); //when clicked on edit we should bring it to the input place 
    updatelist();
    updatestatus();
    savetask();
};

const updatestatus = () => {
   const completetasks = tasks.filter(task => task.completed).length;
   const total = tasks.length;
   const progress = (completetasks / total) * 100;
   const progressbar = document.getElementById('progress');

   progressbar.style.width = `${progress}%`;

   document.querySelector('.num').innerText = `${completetasks} / ${total}`;

   if(tasks.length && completetasks===total){
        blast();
   }
};

const savetask = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", () => {
    const storeditems = JSON.parse(localStorage.getItem('tasks'));

    if (storeditems) {
        storeditems.forEach((task) => tasks.push(task));
        updatelist();
        updatestatus();
    }
});


const blast=()=>{
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}