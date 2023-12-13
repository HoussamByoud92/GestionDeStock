<?php
    require('fpdf/fpdf.php');
    require('../metier/commande.php');

    $n=$_GET['n'];
    $total=0;

    $Commande=new Commande("","");
    $cmd=$Commande->readById($_GET['n']);
    $ln=$Commande->readByIdLine($n);


    $pdf = new FPDF();
    $pdf->AddPage();

    $pdf->SetFont('Arial','',16);
    $pdf->SetFillColor(256,256,256);
    $pdf->Cell(90,10,'Commande numero :',0,0,'L');
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(90,10,$n,0,0,'R');
    $pdf->Ln();

    $pdf->SetFont('Arial','',16);
    $pdf->SetFillColor(256,256,256);
    $pdf->Cell(90,10,'Client :',0,0,'L');
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell(90,10,$cmd[0]['nom'],0,0,'R');
    $pdf->Ln();

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

    for($i=0;$i<count($ln);$i++){
        $pdf->Cell($width_cell[0],10,$ln[$i]['reference'],1,0,'C',false);
        $pdf->Cell($width_cell[1],10,$ln[$i]['prix'],1,0,'C',false);
        $pdf->Cell($width_cell[2],10,$ln[$i]['qtt'],1,0,'C',false);
        $pdf->Cell($width_cell[3],10,$ln[$i]['prix']*$ln[$i]['qtt'],1,1,'C',false);
        $total+=$ln[$i]['prix']*$ln[$i]['qtt'];
    }
    $pdf->Cell($width_cell2[0],10,'TOTAL',1,0,'C',false);
    $pdf->SetFont('Arial','B',16);
    $pdf->Cell($width_cell2[1],10,$total." Dhs",1,1,'C',false);


    $pdf->Output();
?>