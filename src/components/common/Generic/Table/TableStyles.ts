/**
 * parece exagero, mas a tabela vem de uma lib e a estilização vem no prop (apenas para nao encher o componente com estilização grande).
 */

export const tableStyles = {
  table: {
    style: { backgroundColor: 'transparent' },
  },
  expanderRow: {
    style: {
      backgroundColor: 'transparent', // Ou '#ffffff05' para um leve destaque
      color: '#2b7fff',
    },
  },
  expanderCell: {
    style: {
      flex: 'none', // Ajuda a alinhar o ícone de expandir
    },
  },
  expanderButton: {
    style: {
      color: 'white',
      fill: 'white',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: '#ffffff10',
      },
    },
  },
  header: {
	style: {
		fontSize: '22px',
		color: 'white',
		backgroundColor: '#ffffff10',
		minHeight: '56px',
		paddingLeft: '16px',
		paddingRight: '8px',
	},
  },
  subHeader: {
	style: {
		backgroundColor: '#ffffff10',
		minHeight: '52px',
	},
  },
  head: {
	style: {
		color: 'white',
		fontSize: '12px',
		fontWeight: 500,
	},
  },
  headRow: {
    style: { backgroundColor: '#ffffff10', color: 'white', borderColor: '#ffffff15' },
  },
  headCells: {
    style: { color: 'white', fontSize: '14px' },
  },
  rows: {
    style: { backgroundColor: 'transparent', color: 'white', borderColor: '#ffffff10' },
    highlightOnHoverStyle: {
      backgroundColor: '#ffffff08',
      borderColor: 'transparent',
      color: 'white',
    },
  },
  pagination: {
    style: { backgroundColor: '#ffffff10', color: 'white', borderColor: '#ffffff10' },
    pageButtonsStyle: {
		borderRadius: '50%',
		height: '40px',
		width: '40px',
		padding: '8px',
		margin: 'px',
		cursor: 'pointer',
		transition: '0.4s',
		color: 'white',
		fill: 'white',
		backgroundColor: 'transparent',
		'&:disabled': {
			cursor: 'unset',
			color: 'gray',
			fill: 'gray',
		},
		'&:hover:not(:disabled)': {
			backgroundColor: '#ffffff08',
		},
		'&:focus': {
			outline: 'none',
			backgroundColor: '#ffffff8',
		},
	},
  },
  noData: {
	style: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',
		backgroundColor: 'black',
	},
  },
  progress: {
	style: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',
		backgroundColor: 'black',
	},
  },
}