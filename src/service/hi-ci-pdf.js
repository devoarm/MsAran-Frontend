import jsPDF from "jspdf";
import font from "@/service/font";
import imageFinalHiCi from "@/assets/images/covid/final_hi_ci.png";

function formatDate (input) {
    var datePart = input.match(/\d+/g),    
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];        
    return day+'-'+month+'-'+year;
}
function betweenDate (startDate,endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let newSDate = startDate.split("-").reverse().join("-");
    let newEDate = endDate.split("-").reverse().join("-");
    const firstDate = new Date(newSDate);
    const secondDate = new Date(newEDate);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));    
    return diffDays.toString()
}

export const creatFinalHiCi = (data) => {         
    let pdfName = "test";
    var doc = new jsPDF("p", "mm", "a4");
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    doc.addFileToVFS("THSarabunNew-normal.ttf", font);
    doc.addFont("THSarabunNew-normal.ttf", "THSarabunNew", "normal");
    doc.setFont("THSarabunNew");
    doc.setFontSize(10);
    doc.text(data.hospcode, 27, 28); //ชื่อหน่วยบริการ
    doc.text(data.obj_hoscode, 118, 27); //.รหัสหน่วยบริการ
    doc.text(data.vstdate, 150, 27); //วันที่รับบริการ
    (data.dcdate!=null? doc.text(data.dcdate, 183, 27):doc.text("", 183, 27))
//   doc.text(data.dcdate, 183, 27); //.วันที่จำหน่าย.
    doc.text(data.fullname, 25, 33); //ชื่อ-นามสกุล
    doc.text('สูสี่', 63, 33); //PID
    doc.text(data.sex, 90, 33); //เพศ
    doc.text('สูสี่', 104, 33); //อายุ
    doc.text(`${data.addrpart} ต.${data.tmbpart} อ.${data.amppart} จ.${data.chwpart}`, 23, 38); //ที่อยู่
    doc.text('สูสี่', 139, 38); //เบอร์โทร
    doc.text('สูสี่', 171, 38); //id line
    


    doc.addImage(imageFinalHiCi, "PNG", 0, 0, width, height);
    window.open(doc.output("bloburl", { pdfName: pdfName }), "_blank");
}
