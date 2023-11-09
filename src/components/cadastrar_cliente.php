<?php

// Conectar ao banco de dados MySQL
$conn = new PDO('mysql:host=localhost;dbname=hotel_alverg', 'root', '');

// Obter os dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$fone = $_POST['fone'];
$cpf = $_POST['cpf'];
$hosted = $_POST['hosted'];

// Inserir os dados do formulário no banco de dados
$sql = "INSERT INTO clientes (nome, email, telefone, cpf, hospedado) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(1, $nome);
$stmt->bindParam(2, $email);
$stmt->bindParam(3, $fone);
$stmt->bindParam(4, $cpf);
$stmt->bindParam(5, $hosted);
$stmt->execute();

// Fechar a conexão com o banco de dados
$conn = null;

// Enviar uma mensagem de sucesso para o usuário
echo json_encode([
  'success' => true,
  'message' => 'Cliente cadastrado com sucesso!'
]);

?>
