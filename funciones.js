// Función para obtener el nombre del mes basado en el número del mes
const obtenerNombreMes = (mes) => {
   const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
   return meses[mes - 1];
};

// Función para cargar la bitácora desde el archivo bitacora.json
const cargarBitacora = () => {
   fetch('bitacora.json')
      .then(response => {
         if (!response.ok) {
            throw new Error('No se pudo cargar el archivo bitacora.json');
         }
         return response.json(); // Parsear los datos como JSON
      })
      .then(bitacora => {
         listarBitacora(bitacora); // Llamar a la función de renderizado de la bitácora
      })
      .catch(error => {
         console.error('Error cargando los datos de la bitácora:', error);
      });
};

// Función para renderizar la bitácora con la separación de meses
const listarBitacora = (bitacora) => {
   const contenido = bitacora.reverse().map((p, index, arr) => {
       // Detectar si el mes ha cambiado para agregar la separación
       const mesAnterior = index === 0 ? null : arr[index - 1].mes;
       const mostrarMes = mesAnterior !== p.mes; // Mostrar mes solo si cambia

       // Condicional para agregar el separador de mes
       let mesSeparadorHTML = '';
       if (mostrarMes) {
           const nombreMes = obtenerNombreMes(p.mes);
           const mesYAnio = `${nombreMes} ${p.año}`;
           mesSeparadorHTML = ` 
               <li class="month-separator">
                   <span>${mesYAnio}</span>
               </li>
           `;
       }

       // Crear la estructura de cada bitácora
       const clase = index % 2 === 0 ? 'indexExtension1-right' : 'indexExtension1-badge';

       return `
           ${mesSeparadorHTML}  <!-- Mostrar el mes si corresponde -->
           <li class="${clase}">
               <div class="indexExtension1-badge"><i class="fa fa-user"></i></div>
               <div class="indexExtension1-panel">
                   <div class="indexExtension1-heading">
                       <h4 class="indexExtension1-title">${p.titulo}</h4>
                       <p class="indexExtension1-date">${p.tema}</p>
                   </div>
                   <div class="indexExtension1-body">
                       <p>${p.descripcion}</p>
                   </div>
               </div>
           </li>
       `;
   }).join('');

   // Insertar el contenido en el contenedor correspondiente
   document.querySelector("#indexExtension1").innerHTML = contenido;
};

// Llamada inicial para cargar la bitácora
cargarBitacora();
