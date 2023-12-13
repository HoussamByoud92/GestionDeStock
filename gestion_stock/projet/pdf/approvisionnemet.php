<?php
    require('fpdf/fpdf.php');
    require('../metier/approvisionnemet.php');

    $id=$_GET['id'];
    $total=0;

    $approvisionnemet=new approvisionnemet("","","","");
    $app=$approvisionnemet->readById($id);


    $pdf = new FPDF();
    $pdf->AddPage();

    $pdf->SetFont('Arial','',16);
    $pdf->SetFillColor(256,256,256);
    $pdf->Cell(90,10,'Aprovisionnement numero :',0,0,'L');
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(90,10,$id,0,0,'R');
    $pdf->Ln();

    $pdf->SetFont('Arial','',16);
    $pdf->SetFillColor(256,256,256);
    $pdf->Cell(90,10,'Fournissuer :',0,0,'L');
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(90,10,$app[0]['nom'],0,0,'R');
    $pdf->Ln();

    $pdf->SetFont('Arial','',16);
    $pdf->SetFillColor(256,256,256);
    $pdf->Cell(90,10,'Date :',0,0,'L');
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(90,10,date("d/m/Y"),0,0,'R');
    $pdf->Ln();$pdf->Ln();$pdf->Ln();

    $width_cell=array(45,45,45,45);
    $width_cell2=array(135,45);
    $pdf->SetFont('Arial','B',12);
    $pdf->Cell($width_cell[0],10,'PRODUIT',1,0,'C',false);
    $pdf->Cell($width_cell[1],10,'PRIX UNITAIRE(Dhs)',1,0,'C',false);
    $pdf->Cell($width_cell[2],10,'QUANTITE',1,0,'C',false);
    $pdf->Cell($width_cell[3],10,'PRIX TOTAL(Dhs)',1,1,'C',false);
    
    $pdf->SetFont('Arial','',12);

    $pdf->Cell($width_cell[0],10,$app[0]['reference'],1,0,'C',false);
    $pdf->Cell($width_cell[1],10,$app[0]['prix_ach'],1,0,'C',false);
    $pdf->Cell($width_cell[2],10,$app[0]['q'],1,0,'C',false);
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell($width_cell[3],10,$app[0]['prix_ach']*$app[0]['qtt'],1,1,'C',false);


    $pdf->Output();
?>