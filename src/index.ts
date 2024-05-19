import express from 'express';
import autoridadesRoutes from './routes/autoridades';
import bibliotecaDigitalRoutes from './routes/biblioteca-digital';
import { revistaRoutes } from './routes/revista-cucicba';
import { faqRoutes } from './routes/preguntas-frecuentes';

const app = express();
app.use(express.json());

app.use('/servicios/preguntas-frecuentes',faqRoutes)
app.use('/servicios/revista-cucicba',revistaRoutes)
app.use('/autoridades',autoridadesRoutes)
app.use('/servicios/biblioteca-digital',bibliotecaDigitalRoutes)
const PORT = 3000;

app.listen(PORT,()=>{
    console.log("servidor escuchando en el puerto" + PORT)
})