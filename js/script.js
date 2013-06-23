
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
    };
})();


( function() {

    //set up particles
    var 
    particleCount = 100,
    particleGeometry = new THREE.Geometry(),
    particleMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
            "../images/particle.png"
        ),
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    var container;

    var camera, controls, scene, renderer;



    function init() {

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 500;

        controls = new THREE.OrbitControls( camera );
        controls.addEventListener( 'change', render );

        scene = new THREE.Scene();


        for ( i = 0; i < particleCount; i ++ ) {

            var vertex = new THREE.Vector3();
            vertex.x = Math.random() * 1000 - 500;
            vertex.y = Math.random() * 1000 - 500;
            vertex.z = Math.random() * 1000 - 500;

            particleGeometry.vertices.push( vertex );

        }

        particles = new THREE.ParticleSystem( particleGeometry, particleMaterial );

        scene.add(particles);
        console.log(particles.geometry);

        renderer = new THREE.WebGLRenderer( { antialias: false } );
        renderer.setSize( window.innerWidth, window.innerHeight );

        container = document.getElementById( 'canvas' );
        container.appendChild( renderer.domElement );


        //

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        render();

    }

    function animate() {


        requestAnimationFrame( animate );
        render();
        controls.update();

    }

    function render() {
        renderer.render( scene, camera );

    }
    init();
    render();
    animate();

}());
