const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

/**
 * Centralized API client for backend communication
 */
class ApiClient {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        console.log(`[ApiClient] Requesting: ${url}`);

        try {
            let response;
            try {
                response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    }
                });
            } catch (netErr) {
                console.error("[ApiClient] Network Fetch Error:", netErr);
                throw new ApiError('Network connection failed', 'NETWORK_ERROR', 0);
            }

            console.log(`[ApiClient] Response Status: ${response.status} ${response.statusText}`);
            const responseText = await response.text();
            console.log("[ApiClient] Raw Response Body:", responseText);

            let data;
            try {
                // Handle empty response gracefully
                if (!responseText || responseText.trim() === "") {
                    // If status is not ok but body is empty, we must create an error object
                    data = { error: response.statusText, code: `HTTP_${response.status}` };
                } else {
                    data = JSON.parse(responseText);
                }
            } catch (parseError) {
                console.error("[ApiClient] JSON Parse Error. Response body:", responseText);
                throw new ApiError(`Invalid server response (${response.status})`, 'PARSE_ERROR', response.status);
            }

            if (!response.ok) {
                console.error("[ApiClient] API Error:", data);
                throw new ApiError(data.error || 'Request failed', data.code, response.status);
            }

            return data;

        } catch (error) {
            if (error instanceof ApiError) throw error;

            console.error("[ApiClient] Unexpected Error:", error);
            throw new ApiError(
                error.message || 'Network error. Please check your connection.',
                'UNKNOWN_ERROR',
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
