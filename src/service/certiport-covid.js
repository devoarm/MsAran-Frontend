import jsPDF from "jspdf";
import font from "@/service/font";
import imageCertiport from "@/assets/images/covid/certiportCovid19.png";

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

export const creatCertiport = (data) => {    
    var dcFomat = formatDate(data.dcdate)    
    let pdfName = "test";
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      doc.addFileToVFS("THSarabunNew-normal.ttf", font);
      doc.addFont("THSarabunNew-normal.ttf", "THSarabunNew", "normal");
      doc.setFont("THSarabunNew");
      doc.setFontSize(12);
      //คนกรอก
      doc.text(data.fullname, 65, 37); //ชื่อ-นามสกุล
      doc.text(data.cid, 65, 46); //เลขบัตร
      doc.text(`${data.addrpart} ต.${data.tmbpart} อ.${data.amppart} จ.${data.chwpart}`, 62, 55); //สถานที่อยู่
      doc.text("", 120, 72); //ชื่อสถานพยาบาล
      doc.text(data.vstdate, 43, 79); //เมื่อวันที่
      doc.text(`${data.addrpart} ต.${data.tmbpart} อ.${data.amppart} จ.${data.chwpart}`, 123, 86); //Community isolation
      (data.dcdate!=null? doc.text(data.hospcode, 70, 92):doc.text("", 70, 92)) //ภายใต้การดูแล
      doc.text(data.vstdate, 120, 92); //ระหว่าง
      (data.dcdate!=null? doc.text(dcFomat, 144, 92):doc.text("", 144, 92)) //ถึง
      doc.text(betweenDate(data.vstdate,formatDate(data.dcdate)), 192, 93); //รวม
      doc.text("", 45, 99); // ประวัติอื่นที่สำคัญ
      //แพทย์กรอก
      doc.text('โรงพยาบาลอรัญประเทศ', 50, 134); //สถานที่ตรวจ
      doc.text(data.vstdate, 134, 135); //วันที่
      doc.text("นพ.ธีร์ธวัช บรรลือคุณ", 47, 141); //เดือน
      doc.text("แพทย์", 180, 141); //ปี
      doc.text(data.hospcode, 65, 147); //ปฏิบัติงานภายใต
      doc.text(data.fullname, 154, 147); //ขอรับรองวา


      doc.addImage(imageCertiport, "PNG", 0, 0, width, height);
      window.open(doc.output("bloburl", { pdfName: pdfName }), "_blank");
}
