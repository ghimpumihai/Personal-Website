import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from '@/components/layout/Header'
import { ThemeProvider } from '@/context/ThemeContext'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('Header component', () => {
  it('renders the Portfolio logo', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    )
    expect(screen.getByText('Portfolio')).toBeDefined()
  })
})