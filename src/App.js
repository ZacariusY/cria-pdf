import React, { useState } from 'react';
import './App.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Dados de exemplo para o relatório
const dadosVendas = [
  { mes: 'Jan', vendas: 4000, lucro: 2400 },
  { mes: 'Fev', vendas: 3000, lucro: 1398 },
  { mes: 'Mar', vendas: 2000, lucro: 9800 },
  { mes: 'Abr', vendas: 2780, lucro: 3908 },
  { mes: 'Mai', vendas: 1890, lucro: 4800 },
  { mes: 'Jun', vendas: 2390, lucro: 3800 },
];

const dadosProdutos = [
  { id: 1, produto: 'Produto A', categoria: 'Eletrônicos', preco: 1200.50, estoque: 15 },
  { id: 2, produto: 'Produto B', categoria: 'Roupas', preco: 89.99, estoque: 32 },
  { id: 3, produto: 'Produto C', categoria: 'Casa', preco: 45.00, estoque: 8 },
  { id: 4, produto: 'Produto D', categoria: 'Livros', preco: 25.90, estoque: 12 },
  { id: 5, produto: 'Produto E', categoria: 'Esportes', preco: 156.75, estoque: 5 },
];

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#555',
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 10,
    textAlign: 'center',
  },
  chartSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  chartText: {
    fontSize: 12,
    marginBottom: 10,
    color: '#666',
  },
  summary: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  summaryText: {
    fontSize: 12,
    marginBottom: 5,
    color: '#333',
  }
});

// Componente do documento PDF
const RelatorioPDF = ({ dadosGrafico, dadosTabela }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Relatório de Vendas e Produtos</Text>
        
        {/* Seção de Resumo */}
        <View style={styles.summary}>
          <Text style={styles.subtitle}>Resumo Executivo</Text>
          <Text style={styles.summaryText}>Total de Vendas: R$ {dadosGrafico.reduce((acc, item) => acc + item.vendas, 0).toLocaleString()}</Text>
          <Text style={styles.summaryText}>Total de Lucro: R$ {dadosGrafico.reduce((acc, item) => acc + item.lucro, 0).toLocaleString()}</Text>
          <Text style={styles.summaryText}>Produtos em Estoque: {dadosTabela.length}</Text>
          <Text style={styles.summaryText}>Data do Relatório: {new Date().toLocaleDateString('pt-BR')}</Text>
        </View>

        {/* Seção do Gráfico */}
        <View style={styles.chartSection}>
          <Text style={styles.subtitle}>Dados de Vendas por Mês</Text>
          <Text style={styles.chartText}>
            Este gráfico mostra a evolução das vendas e lucros ao longo dos últimos 6 meses.
          </Text>
          {dadosGrafico.map((item, index) => (
            <Text key={index} style={styles.chartText}>
              {item.mes}: Vendas R$ {item.vendas.toLocaleString()} | Lucro R$ {item.lucro.toLocaleString()}
            </Text>
          ))}
        </View>

        {/* Seção da Tabela */}
        <Text style={styles.subtitle}>Inventário de Produtos</Text>
        <View style={styles.table}>
          {/* Cabeçalho da tabela */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>ID</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Produto</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Categoria</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Preço</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Estoque</Text>
            </View>
          </View>
          
          {/* Linhas de dados */}
          {dadosTabela.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.produto}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.categoria}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>R$ {item.preco.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.estoque}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

function App() {
  const [dadosGrafico] = useState(dadosVendas);
  const [dadosTabela] = useState(dadosProdutos);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gerador de Relatórios em PDF</h1>
        <p>Sistema completo de geração de relatórios com gráficos e tabelas</p>
      </header>
      
      <main className="App-main">
        {/* Seção do Gráfico */}
        <section className="grafico-section">
          <h2>Gráfico de Vendas</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={dadosGrafico}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="vendas" fill="#8884d8" name="Vendas" />
              <Bar dataKey="lucro" fill="#82ca9d" name="Lucro" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Seção da Tabela */}
        <section className="tabela-section">
          <h2>Tabela de Produtos</h2>
          <table className="produtos-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
              </tr>
            </thead>
            <tbody>
              {dadosTabela.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.produto}</td>
                  <td>{item.categoria}</td>
                  <td>R$ {item.preco.toFixed(2)}</td>
                  <td>{item.estoque}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Botão para gerar PDF */}
        <section className="pdf-section">
          <h2>Gerar Relatório PDF</h2>
          <PDFDownloadLink
            document={<RelatorioPDF dadosGrafico={dadosGrafico} dadosTabela={dadosTabela} />}
            fileName="relatorio-vendas.pdf"
            className="pdf-button"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Gerando PDF...' : 'Baixar Relatório PDF'
            }
          </PDFDownloadLink>
        </section>
      </main>
    </div>
  );
}

export default App;
