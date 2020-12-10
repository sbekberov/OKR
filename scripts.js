
const anim = document.querySelector("#anim");
const green = document.querySelector("#green");
const red = document.querySelector("#red");



const play_button = document.querySelector("#play-button");
const close_button = document.querySelector("#close-button");
const start_button = document.querySelector("#start");
const stop_button = document.querySelector("#stop");
const reload_button = document.querySelector("#reload");
const text_field = document.querySelector("#text-field");
const events = [];



let radius = green.offsetHeight/2;
let start_coord_first_x = green.offsetWidth + 80;
let start_coord_first_y = green.offsetHeight + 70;
let start_coord_second_x = green.offsetWidth + 75;
let start_coord_second_y = green.offsetHeight + 70;
let dx = 8;
let dy = 2;
let isActive = false;
let interval;

function buttons()
{
    play_button.addEventListener("click", () => 
    {
        localStorage.clear();
        work.setAttribute("style", "display: flex;");
        text_field.innerHTML = "Нажата кнопка PLAY";
        events.push("Нажата кнопка PLAY");
        localStorage.setItem(new Date(), "Нажата кнопка PLAY");
        document.querySelector("#localStorage").value = "";
    });

    close_button.addEventListener("click", () => 
    {
        work.setAttribute("style", "display: none;");
        text_field.innerHTML = "Нажата кнопка CLOSE";
        events.push("Нажата кнопка CLOSE");
        localStorage.setItem(new Date(), "Нажата кнопка CLOSE");
        let keys = Object.keys(localStorage),
            values = [],
            i = keys.length;

        while ( i-- ) 
        {
            values.push( localStorage.getItem(keys[i]) );
        }
        keys.sort();
        keys.forEach((item) => 
        {
            if(events.includes(localStorage.getItem(item)))
            {
                document.querySelector("#localStorage").value += `${localStorage.getItem(item)}   -   ${item}\n`;
            }
        });
    });

    start_button.addEventListener("click", () => 
    {
        green.setAttribute("style", `visibility:visible`);
        red.setAttribute("style", `visibility:visible`);
        if(!isActive)
        {
            interval = setInterval(draw, 20);
        }
        isActive = true;
        start_button.setAttribute("style", "display: none;");
        stop_button.setAttribute("style", "display: block;");
        text_field.innerHTML = "Нажата кнопка START";
        events.push("Нажата кнопка START");
        localStorage.setItem(new Date(), "Нажата кнопка START");
    });

    stop_button.addEventListener("click", () => 
    {
        start_button.setAttribute("style", "display: block;");
        stop_button.setAttribute("style", "display: none;");
        text_field.innerHTML = "Нажата кнопка STOP";
        events.push("Нажата кнопка STOP");
        localStorage.setItem(new Date(), "Нажата кнопка STOP");
        clearInterval(interval);
        isActive = false;
    });

    reload_button.addEventListener("click", () => 
    {
        reload_button.setAttribute("style", "display: none;");
        start_button.setAttribute("style", "display: block;");
        text_field.innerHTML = "Нажата кнопка RELOAD";
        localStorage.setItem(new Date(), "Нажата кнопка RELOAD");
        events.push("Нажата кнопка RELOAD");
    });
}

function rand_coord()
{
   start_coord_first_y = Math.floor(Math.random() * Math.floor(anim.offsetHeight - 90)) + 90;
    start_coord_second_x = Math.floor(Math.random() * Math.floor(anim.offsetWidth - 70)) + 70;
}


function draw() 
{
    green.setAttribute("style", `top: ${start_coord_first_y}px; left: ${start_coord_first_x}px`);
    red.setAttribute("style", `top: ${start_coord_second_y}px; left: ${start_coord_second_x}px`);

    green.style.display = "block";
    red.style.display = "block";

    if(start_coord_first_x + dx > anim.offsetWidth-green.offsetWidth || start_coord_first_x + dx < 2) 
    {
        dx = -dx;
        text_field.innerHTML = "Горизонтальный круг ударился об стену";
        events.push("Горизонтальный круг ударился об стену");
        localStorage.setItem(new Date(), "Горизонтальный круг ударился об стену");
    }

    start_coord_first_x += dx;

    if(start_coord_second_y + dy > anim.offsetHeight || start_coord_second_y + dy < 50) {
        dy = -dy;
        text_field.innerHTML = "Вертикальный круг ударился об стену";
        events.push("Вертикальный круг ударился об стену");
        localStorage.setItem(new Date(), "Вертикальный круг ударился об стену");
    }
    
    start_coord_second_y += dy;

    if(Math.abs(start_coord_first_y - start_coord_second_y) < green.clientHeight - 20 + 1 && Math.abs(start_coord_first_x - start_coord_second_x) < green.clientWidth - 20 + 1){
        clearInterval(interval);
        isActive = false;
        setRand();
        reload_button.setAttribute("style", "display: block;");
        start_button.setAttribute("style", "display: none;");
        stop_button.setAttribute("style", "display: none;");
        text_field.innerHTML = "Круги столкнулись";
        events.push("Круги столкнулись");
        localStorage.setItem(new Date(), "Круги столкнулись");
    }
}


(function main()
{
    
    buttons();

    rand_coord();

})();