import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

// Use the same router as the application to exercise URL and history changes.
function renderApp(path = '/') {
  window.history.replaceState({}, '', path)
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
}

beforeEach(() => {
  window.history.replaceState({}, '', '/')
})

describe('portfolio navigation', () => {
  it('shows the introduction on the home route', () => {
    renderApp()

    expect(screen.getByRole('heading', {
      level: 1, name: "Hi, I'm Gunnar Oscarson",
    })).toBeInTheDocument()
    expect(screen.queryByRole('heading', {
      level: 1, name: 'Projects',
    })).not.toBeInTheDocument()
  })

  it('shows Projects when visiting its URL directly', () => {
    renderApp('/projects')

    expect(screen.getByRole('heading', {
      level: 1, name: 'Projects',
    })).toBeInTheDocument()
  })

  it('visiting an unknown URL shows a Page not found message', () => {
    renderApp('/unknown')

   expect(screen.getByRole('heading', {name: 'Page not found'})).toBeInTheDocument()
  })

  it('navigates between pages while keeping navigation available', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: 'Projects' }))

    expect(window.location.pathname).toBe('/projects')
    expect(screen.getByRole('heading', {
      level: 1, name: 'Projects',
    })).toBeInTheDocument()
    expect(screen.queryByRole('heading', {
      level: 1, name: "Hi, I'm Gunnar Oscarson",
    })).not.toBeInTheDocument()
    expect(within(screen.getByRole('navigation')).getByRole('link', {
      name: 'Projects',
    })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Home' }))

    expect(window.location.pathname).toBe('/')
    expect(screen.getByRole('heading', {
      level: 1, name: "Hi, I'm Gunnar Oscarson",
    })).toBeInTheDocument()
  })

  it('restores the previous and next pages through browser history', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('link', { name: 'Projects' }))

    window.history.back()

    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
      expect(screen.getByRole('heading', {
        level: 1, name: "Hi, I'm Gunnar Oscarson",
      })).toBeInTheDocument()
    })

    window.history.forward()

    await waitFor(() => {
      expect(window.location.pathname).toBe('/projects')
      expect(screen.getByRole('heading', {
        level: 1, name: 'Projects',
      })).toBeInTheDocument()
    })
  })
})
