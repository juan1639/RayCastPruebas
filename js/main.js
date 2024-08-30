import { key_up, key_down, touch_start, touch_end } from "./listeners.js";
import { Level } from "./class/escenario.js";
import { Jugador } from './class/jugador.js';
import { Settings } from "./settings.js";
import { Escenarios } from "./escenarios.js";

import {
	startGameValues,
	sueloCielo,
	reescalarCanvas,
	borraCanvas
} from "./functions/functions.js";

// ----------------------------------------------------------------------
//	OBJETOS
// ----------------------------------------------------------------------
var botonComenzar = document.getElementById('boton-comenzar');
var escenario;
var jugador;
//var ray;

var sprites = [];	// array con los sprites
var armas = [];	// array con las armas

// ----------------------------------------------------------------------
// 	EVENTOS (Menu Config pre-juego)
// ----------------------------------------------------------------------
botonComenzar.addEventListener('click', (e) =>
{
	console.log(e.target.id);

	if (Settings.estado.menuConfig)
	{
		startGameValues();
	}
});

// -------------------------------------------------------------------------------------
//	ALGORITMO DEL PINTOR, ORDENAMOS LOS SPRITES DE MÁS LEJANO AL JUGADOR A MÁS CERCANO
// -------------------------------------------------------------------------------------
function renderSprites()
{
	// NOTA: HACER EL ALGORITMO DE ORDENACIÓN MANUAL
		
	// ALGORITMO DE ORDENACIÓN SEGÚN DISTANCIA (ORDEN DESCENDENTE)
	// https://davidwalsh.name/array-sort

	sprites.sort(function(obj1, obj2) {
		// Ascending: obj1.distancia - obj2.distancia
		// Descending: obj2.distancia - obj1.distancia
		return obj2.distancia - obj1.distancia;
	});

	// DIBUJAMOS LOS SPRITES UNO POR UNO
	for (let i = 0; i < sprites.length; i ++)
	{
		sprites[i].dibuja();
	}
}

// ============================================================================
//	FUNCION INICIALIZADORA
//	
// ----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () =>
{
	const {
		canvas, ctx,
		FPS,
		tamTile,
		canvasAncho,
		canvasAlto,
		tiles,
		tilesVert,
		reescalaCanvas
	} = Settings;

	tiles.src = "img/walls7.png";
	tilesVert.src = "img/walls7vert.png";

	console.log(tiles.width, tilesVert.height);
	console.log(tiles.width, tilesVert.width);

	//	MODIFICA EL TAMAÑO DEL CANVAS
	canvas.width = canvasAncho;
	canvas.height = canvasAlto;

	console.log(canvas.width);
	console.log(canvas.height);

	const midTamTile = tamTile / 2;

	escenario = new Level(canvas, ctx, Escenarios.niveles.uno);
	jugador = new Jugador(ctx, escenario, 1 * tamTile + midTamTile, 1 * tamTile + midTamTile);

	//	CARGAMOS LAS ARMAS DEL JUGADOR
	//inicializaArmasJugador();

	//	CARGAMOS LOS SPRITES DESPUÉS DEL ESCENARIO Y EL JUGADOR
	//inicializaSprites();

	//	AMPLIAMOS EL CANVAS CON CSS
	//reescalarCanvas(reescalaCanvas.X, reescalaCanvas.Y);
});

function buclePrincipal()
{
	const {modo3D, COLORES} = Settings;
	
	borraCanvas();

	if (!modo3D)
	{
		escenario.dibuja();
	}

	if (modo3D)
	{
		sueloCielo(COLORES.CIELO, COLORES.SUELO);
	}
  
	jugador.dibuja();
	//renderSprites();
	//dibujaArmasJugador();
	//dibujaPtoMira();
}

export { jugador, buclePrincipal };
