import { DataSource } from "typeorm";
import { PreguntaFrecuente } from "../entity/servicios/PreguntaFrecuente";
import { CategoriasPreguntasFrecuentes } from "../entity/servicios/Categoria_pregunta_frecuente";

class PreguntasFrecuentesTableSeeder {
    public async run(cn: DataSource = null) {
        if (cn.driver.options.type === "sqlite")
            await cn.manager.query("DELETE FROM pregunta_frecuente;");
        else
            await cn.manager.query(
                "TRUNCATE TABLE public.pregunta_frecuente RESTART IDENTITY CASCADE;"
            );
        const categorias = await cn.manager.find(CategoriasPreguntasFrecuentes);
        const categoriaAsesoramientoImpositivo = categorias.find(cat => cat.nombre === "ASESORAMIENTO IMPOSITIVO");
        const pregunta1 = new PreguntaFrecuente();
        pregunta1.pregunta = "¿Es obligatorio el uso del posnet?";
        pregunta1.respuesta = `<p>A partir de la promulgación de la ley 27.253 y de su instrumentación mediante la Resolución General de AFIP Nº 3997-E todos aquellos comerciantes y/o profesionales que realicen ventas y/o prestaciones de servicio con consumidores finales deben tener instalado algún dispositivo que les permita a sus clientes abonar sus compras con tarjeta de débito. La fecha de implementación comenzó desde el 31/07/2017 (contribuyentes inscriptos en IVA), y/o hasta el 31/03/2018 (contribuyentes Monotributistas) dependiendo de la actividad desarrollada.</p>
            <p>El costo que le insuma al contribuyente adoptar el sistema, podrá computarse como crédito fiscal del impuesto al valor agregado.</p>
            <p>Hemos solicitado a la AFIP la exclusión del uso de posnet. No obteniendo respuesta aún.</p>
            <p>Solicitamos tener en cuenta las siguientes situaciones:</p>
            <ol>
                <li>Sí el profesional decide adherir al servicio POSNET, las únicas operaciones por las que podrá aceptar medios de pago como: transferencia bancaria, tarjeta de débito, serán las de cobro de los correspondientes honorarios profesionales, excluyendo cualquier otro tipo de pago recibido por cuenta y orden de terceros (cobro de alquileres).</li>
                <li>Sí el profesional adhiere a la premisa del no uso del servicio POSNET, deberá argumentar su negativa, ante posibles requerimientos de la AFIP, con las notas de intercambio entre el fisco y esta institución, remitidas vía correo electrónico el día 27 de marzo de 2018.</li>
            </ol>`
        pregunta1.categoria = categoriaAsesoramientoImpositivo;

        const pregunta2 = new PreguntaFrecuente();
        pregunta2.categoria = categoriaAsesoramientoImpositivo;
        pregunta2.pregunta = "¿Cuáles son los medios de pago que obligatoriamente deben aceptar los comerciantes y/o profesionales?";
        pregunta2.respuesta = `<p>En función de lo establecido en el artículo 10 de la ley 27.253 y en el artículo 1 del Decreto 858 los medios de pagos que obligatoriamente debe aceptar el comerciante son:</p>
            <ul>
                <li>tarjetas de débito,</li>
                <li>tarjetas prepagas no bancarias (son aquellas tarjetas utilizadas para la acreditación exclusiva de beneficios asistenciales o de la seguridad social).</li>
                <li>transferencias bancarias realizadas a través del uso de dispositivos de comunicación móviles (PIM)</li>
            </ul>`
        await cn.manager.save([pregunta1,pregunta2]);
    }
}

export default new PreguntasFrecuentesTableSeeder();
