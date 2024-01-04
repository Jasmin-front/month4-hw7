import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, onPageChanged, currentPage }) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageClick = pageNumber => {
		onPageChanged(pageNumber);
	};

	const paginationContainerStyle = {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '20px',
	};

	const paginationButtonStyle = {
		border: '1px solid #ddd',
		borderRadius: '5px',
		padding: '5px 10px',
		margin: '0 3px',
		cursor: 'pointer',
		backgroundColor: '#fff',
		color: '#000',
	};

	const activeButtonStyle = {
		...paginationButtonStyle,
		backgroundColor: '#007bff',
		color: '#fff',
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		const maxVisibleButtons = 5; // Максимальное количество кнопок для отображения

		let startPage = 1;
		let endPage = totalPages;

		if (totalPages > maxVisibleButtons) {
			const half = Math.floor(maxVisibleButtons / 2);

			if (currentPage > half) {
				startPage = currentPage - half;
				endPage = currentPage + half - 1;
				if (endPage > totalPages) {
					endPage = totalPages;
					startPage = totalPages - maxVisibleButtons + 1;
				}
			} else {
				endPage = maxVisibleButtons;
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<button key={i} style={currentPage === i ? activeButtonStyle : paginationButtonStyle} onClick={() => handlePageClick(i)}>
					{i}
				</button>
			);
		}

		if (startPage > 1) {
			pageNumbers.unshift(
				<button key='start' style={paginationButtonStyle} onClick={() => handlePageClick(1)}>
					1
				</button>
			);
			if (startPage > 2) {
				pageNumbers.unshift(
					<button key='ellipsis-start' style={paginationButtonStyle} disabled>
						...
					</button>
				);
			}
		}

		if (endPage < totalPages) {
			pageNumbers.push(
				<button key='end' style={paginationButtonStyle} onClick={() => handlePageClick(totalPages)}>
					{totalPages}
				</button>
			);
			if (endPage < totalPages - 1) {
				pageNumbers.push(
					<button key='ellipsis-end' style={paginationButtonStyle} disabled>
						...
					</button>
				);
			}
		}

		return pageNumbers;
	};

	return (
		<div className='pagination' style={paginationContainerStyle}>
			{renderPageNumbers()}
		</div>
	);
};

export default Pagination;
