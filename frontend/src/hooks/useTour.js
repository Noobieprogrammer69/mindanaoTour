// import { useState, useEffect } from 'react';
// import img1 from '../../image/1.jpg';
// import img2 from '../../image/2.jpg';
// import img3 from '../../image/3.png';
// import img4 from '../../image/4.jpg';
// import img5 from '../../image/5.jpg';
// import img6 from '../../image/6.jpg';
// import img7 from '../../image/7.jpg';
// import img8 from '../../image/8.jpg';

// const tours = [
//     { id: 1, img: img1, title: 'Tour 1', price: '$100', details: 'Details for Tour 1' },
//     { id: 2, img: img2, title: 'Tour 2', price: '$120', details: 'Details for Tour 2' },
//     { id: 3, img: img3, title: 'Tour 3', price: '$90', details: 'Details for Tour 3' },
//     { id: 4, img: img4, title: 'Tour 4', price: '$110', details: 'Details for Tour 4' },
//     { id: 5, img: img5, title: 'Tour 5', price: '$130', details: 'Details for Tour 5' },
//     { id: 6, img: img6, title: 'Tour 6', price: '$150', details: 'Details for Tour 6' },
//     { id: 7, img: img7, title: 'Tour 7', price: '$80', details: 'Details for Tour 7' },
//     { id: 8, img: img8, title: 'Tour 8', price: '$140', details: 'Details for Tour 8' },
// ];

// export const useTour = (id) => {
//     const [tour, setTour] = useState(null);

//     useEffect(() => {
//         const foundTour = tours.find(t => t.id === parseInt(id));
//         setTour(foundTour);
//     }, [id]);

//     return tour;
// };