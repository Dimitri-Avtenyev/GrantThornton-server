
import ExcelJs from "exceljs";

//AddDataToColumn(firstSheet);
//http://localhost:3000/uploadfile/demo

export const AddDataToColumn = (worksheet: ExcelJs.Worksheet)=>{
    // De cellwaarde aanspreken, in vullen is = "-----" Het overschrijft de waarde. 
        // console.log(worksheet.getCell("B1").value);

        // console.log(wb);
        
        worksheet.spliceColumns(4,2, [], []);
       

    // table.removeColumns(1, 1);
    // table.commit();

    

}


