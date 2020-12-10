const work = document.querySelector("#work");
const canvas = document.querySelector("#canvas");
let context = canvas.getContext('2d');

const play_button = document.querySelector("#play-button");
const close_button = document.querySelector("#close-button");
const start_button = document.querySelector("#start");
const stop_button = document.querySelector("#stop");
const reload_button = document.querySelector("#reload");
const text_field = document.querySelector("#text-field");
const events = [];

let radius = 10;
let start_coord_first_x = radius;
let start_coord_first_y = radius;
let start_coord_second_x = radius;
let start_coord_second_y = radius;
let dx = -2;
let dy = -1;
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
    start_coord_first_y = Math.floor(Math.random() * Math.floor(canvas.height - 2*radius)) + 10;
    start_coord_second_x = Math.floor(Math.random() * Math.floor(canvas.width - 2*radius)) + 10;
}

function draw_circle(x, y, color)
{
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    context.fill();
    context.closePath();
}

function draw() 
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw_circle(start_coord_first_x, start_coord_first_y, "rgb(255, 0, 0)");
    draw_circle(start_coord_second_x, start_coord_second_y, "rgb(0, 255, 0)");

    if(start_coord_first_x + dx > canvas.width-radius || start_coord_first_x + dx < radius) {
        dx = -dx;
        text_field.innerHTML = "Горизонтальный круг ударился об стену";
        events.push("Горизонтальный круг ударился об стену");
        localStorage.setItem(new Date(), "Горизонтальный круг ударился об стену");
    }

    start_coord_first_x += dx;

    if(start_coord_second_y + dy > canvas.height-radius || start_coord_second_y + dy < radius) {
        dy = -dy;
        text_field.innerHTML = "Вертикальный круг ударился об стену";
        events.push("Вертикальный круг ударился об стену");
        localStorage.setItem(new Date(), "Вертикальный круг ударился об стену");
    }

    start_coord_second_y += dy;

    if(Math.abs(start_coord_first_y - start_coord_second_y) < 11 && Math.abs(start_coord_first_x - start_coord_second_x) < 11)
    {
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


(function main(){

    buttons();

    rand_coord();

})();