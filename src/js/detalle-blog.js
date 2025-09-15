document.addEventListener('DOMContentLoaded', () => {
    // 1. Contenido de los artículos del blog
    const blogPosts = [
        {
            id: 1,
            title: "Pronto! Tratamiento veterinario en la tienda",
            image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
            content: `
                <p class="mb-4">En BlackMarkpet, estamos emocionados de anunciar una expansión significativa de nuestros servicios. A partir del próximo mes, no solo seremos tu tienda de confianza para productos de alta calidad, sino también tu centro veterinario de cabecera.</p>
                <p class="mb-4">Nuestro nuevo centro contará con profesionales certificados y equipamiento de última generación para ofrecer consultas generales, vacunación, desparasitación y chequeos preventivos. Creemos en un enfoque integral del bienestar animal, donde la nutrición y la salud van de la mano.</p>
                <p>Esta iniciativa busca ofrecerte la comodidad de encontrar todo lo que tu mascota necesita en un solo lugar, con la confianza y el cuidado que nos caracteriza. ¡Te esperamos para cuidar de tu mejor amigo!</p>
            `
        },
        {
            id: 2,
            title: "Campaña de Adopción de Mascotas Exitosamente Culminada",
            image: "https://i.ytimg.com/vi/7lfy6NV9u24/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AGuCYAC0AWKAgwIABABGD4gZShRMA8=&rs=AOn4CLDJhMD5uqPl8q7noHRr7FOXVm05hw",
            content: `
                <p class="mb-4">Con una alegría inmensa, compartimos los resultados de nuestra reciente campaña de adopción. Gracias al esfuerzo conjunto de la comunidad, refugios locales y nuestro equipo de voluntarios, ¡más de 200 animales han encontrado un hogar amoroso y responsable!</p>
                <p class="mb-4">La iniciativa, que duró todo el mes pasado, no solo conectó a familias con sus nuevos compañeros, sino que también sirvió como una plataforma educativa. Se organizaron charlas sobre tenencia responsable, la importancia de la esterilización y el bienestar animal, logrando sensibilizar a cientos de personas.</p>
                <p>Agradecemos profundamente a todos los que participaron, adoptaron, donaron o difundieron la palabra. Este éxito nos motiva a seguir creando iniciativas que promuevan el amor y el respeto por todos los animales.</p>
            `
        }
    ];

    // 2. Obtener el contenedor y el ID de la URL
    const blogContentContainer = document.getElementById('blog-content');
    const params = new URLSearchParams(window.location.search);
    const blogId = parseInt(params.get('id')); // Convertimos el ID a número

    // 3. Encontrar y mostrar el artículo correspondiente
    const post = blogPosts.find(p => p.id === blogId);

    if (post) {
        blogContentContainer.innerHTML = `
            <article>
                <img src="${post.image}" alt="${post.title}" class="w-full h-80 object-cover rounded-lg shadow-lg mb-8">
                <h1 class="text-4xl font-extrabold text-white mb-6">${post.title}</h1>
                <div class="prose prose-invert prose-lg text-neutral-300">
                    ${post.content}
                </div>
                <div class="mt-8">
                    <a href="blogs.html" class="text-orange-standard hover:underline">← Volver a todos los blogs</a>
                </div>
            </article>
        `;
    } else {
        blogContentContainer.innerHTML = `
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-4">Artículo no encontrado</h1>
                <p class="text-neutral-400">El artículo que buscas no existe o fue movido.</p>
                <a href="blogs.html" class="mt-6 inline-block bg-orange-standard hover:bg-orange-dark text-white font-bold py-2 px-6 rounded transition duration-300">
                    Volver a todos los blogs
                </a>
            </div>
        `;
    }
});