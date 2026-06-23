import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { SearchProvider } from './context/SearchContext'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<SearchProvider>
			<App />
		</SearchProvider>
	</ThemeProvider>
)