const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

/**
 * Centralized API client for backend communication
 */
class ApiClient {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new ApiError(data.error || 'Request failed', data.code, response.status);
            }

            return data;

        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            // Network or parse errors
            throw new ApiError(
                'Network error. Please check your connection.',
                'NETWORK_ERROR',
                0
            );
        }
    }

    // Payment verification
    async verifyPayment(reference) {
        return this.request('/api/payments/verify', {
            method: 'POST',
            body: JSON.stringify({ reference })
        });
    }

    // Tickets
    async createTicket(ticketData) {
        return this.request('/api/tickets/create', {
            method: 'POST',
            body: JSON.stringify(ticketData)
        });
    }

    async getTicket(ticketId) {
        return this.request(`/api/tickets/${ticketId}`);
    }

    async validateTicket(ticketId) {
        return this.request('/api/tickets/validate', {
            method: 'POST',
            body: JSON.stringify({ ticketId })
        });
    }

    // Bookings
    async createBooking(bookingData) {
        return this.request('/api/bookings/create', {
            method: 'POST',
            body: JSON.stringify(bookingData)
        });
    }
}

/**
 * Custom API Error class
 */
class ApiError extends Error {
    constructor(message, code, status) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.status = status;
    }
}

// Export singleton instance
const api = new ApiClient();
export default api;
export { ApiError };
