import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from '@tremor/react';
  
  export default function TableHero ({data}) {
    console.log(data);
    return (
      <div className="mx-auto max-w-2xl">
      <Table>
        <TableHead>
          <TableRow>
            {data.map((check,index)=>(
              <TableHeaderCell key = {index}>{check.date}</TableHeaderCell>
            ))}
            
          </TableRow>
        </TableHead>
  
        <TableBody>
          <TableRow>
          {data.map((check,index)=>(
            <TableCell key = {index}>{check.female}</TableCell>
            ))}
          </TableRow>
          <TableRow>
          {data.map((check,index)=>(
            <TableCell key = {index}>{check.male}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>

    )
    
  };