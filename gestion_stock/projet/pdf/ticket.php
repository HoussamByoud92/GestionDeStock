<?php
    require('fpdf/fpdf.php');
    require('../metier/produit.php');
    $r=explode(",",$_GET['r']);
    $p=explode(",",$_GET['p']);
    $q=explode(",",$_GET['q']);
    $l=$_GET['l'];
    $total=0;

    $pdf = new FPDF();
    $pdf->AddPage();

    $pdf->SetFont('Arial','',16);
    $pdf->SetFillColor(256,256,256);
    $pdf->Cell(90,10,'Date :',0,0,'L');
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(90,10,date("d/m/Y"),0,0,'R');
    $pdf->Ln();
    $pdf->SetFont('Arial','',16);
    $pdf->Cell(90,10,'Huere :',0,0,'L');
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(90,10,date("h:i:sa"),0,0,'R');
    $pdf->Ln();$pdf->Ln();$pdf->Ln();

    $width_cell=array(45,45,45,45);
    $width_cell2=array(135,45);
    $pdf->SetFont('Arial','B',12);
    $pdf->Cell($width_cell[0],10,'PRODUIT',1,0,'C',false);
    $pdf->Cell($width_cell[1],10,'PRIX UNITAIRE(Dhs)',1,0,'C',false);
    $pdf->Cell($width_cell[2],10,'QUANTITE',1,0,'C',false);
    $pdf->Cell($width_cell[3],10,'PRIX TOTAL(Dhs)',1,1,'C',false);
    
    $pdf->SetFont('Arial','',12);

    for($i=0;$i<$l;$i++){
        $pdf->Cell($width_cell[0],10,$r[$i],1,0,'C',false);
        $pdf->Cell($width_cell[1],10,$p[$i],1,0,'C',false);
        $pdf->Cell($width_cell[2],10,$q[$i],1,0,'C',false);
        $pdf->Cell($width_cell[3],10,$p[$i]*$q[$i],1,1,'C',false);
        $total+=$p[$i]*$q[$i];
    }
    $pdf->Cell($width_cell2[0],10,'TOTAL',1,0,'C',false);
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell($width_cell2[1],10,$total." Dhs",1,1,'C',false);


    $pdf->Output();
?>