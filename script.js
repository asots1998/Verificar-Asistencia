// --- Base de datos de asistentes ---
const attendeesDB = [
    {
        name: "Ignacio Loja",
        workshop: "Taller: Procesos de Adopción en el Trabajo Social",
        date: "20 Nov 2024",
        status: "verified"
    },
    {
        name: "Juan Pérez",
        workshop: "Taller: Procesos de Adopción en el Trabajo Social",
        date: "20 Nov 2024",
        status: "verified"
    },
    {
        name: "María Gómez",
        workshop: "Taller: Procesos de Adopción en el Trabajo Social",
        date: "20 Nov 2024",
        status: "verified"
    },
    {
        name: "Carlos Ruiz",
        workshop: "Taller: Procesos de Adopción en el Trabajo Social",
        date: "20 Nov 2024",
        status: "pending"
    }
];

// --- Función principal de verificación ---
function verifyAttendance() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultArea = document.getElementById('resultArea');
    
    // Limpiar resultados anteriores
    resultArea.innerHTML = '';
    resultArea.classList.remove('hidden');

    if (!input) {
        showError("Por favor, ingresa un nombre para buscar.");
        return;
    }

    // Mostrar mensaje de carga
    resultArea.innerHTML = '<div class="text-center text-slate-500"><i class="fa-solid fa-spinner fa-spin mr-2"></i> Buscando en registros...</div>';

    setTimeout(() => {
        // Búsqueda (insensible a mayúsculas/minúsculas)
        const attendee = attendeesDB.find(p => 
            p.name.toLowerCase().includes(input)
        );

        if (attendee) {
            showSuccess(attendee);
        } else {
            showNotFound();
        }
    }, 600);
}

// --- Mostrar éxito ---
function showSuccess(person) {
    const resultArea = document.getElementById('resultArea');
    
    let statusBadge = '';
    if (person.status === 'verified') {
        statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><i class="fa-solid fa-circle-check mr-1"></i> Asistencia Confirmada</span>`;
    } else if (person.status === 'pending') {
        statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><i class="fa-solid fa-clock mr-1"></i> En Revisión</span>`;
    }

    resultArea.innerHTML = `
        <div class="text-center animate-fade-in">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3">
                <i class="fa-solid fa-check text-green-600 text-xl"></i>
            </div>
            <h3 class="text-lg leading-6 font-bold text-slate-900">${person.name}</h3>
            <div class="mt-1">${statusBadge}</div>
            
            <div class="mt-4 text-left bg-white p-3 rounded-lg border border-slate-200 text-sm">
                <div class="flex flex-col gap-2">
                    <div class="flex justify-between items-start">
                        <span class="text-slate-500 whitespace-nowrap mr-2">Evento:</span>
                        <span class="font-medium text-slate-700 text-right leading-tight">${person.workshop}</span>
                    </div>
                    <div class="flex justify-between border-t border-slate-100 pt-2">
                        <span class="text-slate-500">Fecha:</span>
                        <span class="font-medium text-slate-700">${person.date}</span>
                    </div>
                </div>
            </div>
            
            <div class="mt-4 text-xs text-slate-400">
                Registro oficial de la Asociación de Estudiantes.
            </div>
        </div>
    `;
}

// --- Mostrar no encontrado ---
function showNotFound() {
    const resultArea = document.getElementById('resultArea');
    resultArea.innerHTML = `
        <div class="text-center animate-fade-in">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-3">
                <i class="fa-solid fa-user-slash text-red-600 text-xl"></i>
            </div>
            <h3 class="text-lg leading-6 font-medium text-slate-900">No encontrado</h3>
            <p class="mt-2 text-sm text-slate-500">
                No encontramos registros de asistencia con ese nombre para este taller.
            </p>
            <div class="mt-4 text-xs text-slate-400">
                Asegúrate de escribir el nombre y apellido tal como te registraste en la lista.
            </div>
        </div>
    `;
}

// --- Mostrar error ---
function showError(msg) {
    const resultArea = document.getElementById('resultArea');
    resultArea.innerHTML = `<div class="text-red-500 text-center text-sm"><i class="fa-solid fa-circle-exclamation mr-1"></i> ${msg}</div>`;
}

// Event listener para tecla Enter
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verifyAttendance();
    }
});