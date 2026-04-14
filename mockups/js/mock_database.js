const STORAGE_KEY = 'hotgest_db';
const USER_KEY = 'logged_user';
const now = Date.now();

const initialDatabase = {
    users: [
        { id: 1, username: 'admin', password: '123', role: 'admin_geral', name: 'Lucio - Admin Geral', speciality: null },
        { id: 2, username: 'manutencao', password: '123', role: 'admin_manutencao', name: 'Luiz - Gerente Manutencao', speciality: null },
        { id: 3, username: 'controlador', password: '123', role: 'controlador', name: 'Luan - Controlador', speciality: null },
        { id: 4, username: 'executor_eletrica', password: '123', role: 'trabalhador', name: 'Lucas - Executor Eletrico', speciality: 'Eletrica' },
        { id: 5, username: 'executor_hidraulica', password: '123', role: 'trabalhador', name: 'Luther - Executor Hidraulico', speciality: 'Hidraulica' },
        { id: 6, username: 'recepcao', password: '123', role: 'recepcao', name: 'Luciana - Recepcionista', speciality: 'Recepcao' },
        { id: 7, username: 'camareira', password: '123', role: 'camareira', name: 'Lara - Camareira', speciality: null }
    ],
    messages: [
        { id: 1, from: 2, to: 4, ticketId: 1096, content: 'OS #1096 designada para voce.', read: false, time: now - 1000 * 60 * 25, type: 'designacao' }
    ],
    ticketComments: [
        { id: 1, ticketId: 1096, authorId: 2, content: 'Hospede sem acesso. Validar pilhas e modulo RFID.', kind: 'system', time: now - 1000 * 60 * 150 },
        { id: 2, ticketId: 1096, authorId: 4, content: 'Ja estou no quarto e iniciei a verificacao.', kind: 'comment', time: now - 1000 * 60 * 110 }
    ],
    inventory: [
        { id: 1, name: 'Pilha AA', stock: 150, unit: 'un', minStock: 50, unitCost: 4.5, area: 'Eletrica' },
        { id: 2, name: 'Filtro AC Cassete', stock: 12, unit: 'un', minStock: 20, unitCost: 82, area: 'AVAC' },
        { id: 3, name: 'Lampada LED Dicroica', stock: 45, unit: 'un', minStock: 20, unitCost: 18, area: 'Eletrica' },
        { id: 4, name: 'Vedante Hidraulico', stock: 30, unit: 'un', minStock: 10, unitCost: 12, area: 'Hidraulica' }
    ],
    tickets: [
        {
            id: 1095,
            title: 'Vazamento Chiller AC Central',
            category: 'Manutencao',
            location: 'Master Suite 05',
            priority: 'critical',
            complexity: 'complexa',
            status: 'new',
            reviewState: 'pending_assignment',
            createdBy: 6,
            createdTime: now - 1000 * 60 * 40,
            notifiedTime: now - 1000 * 60 * 40,
            assignedTo: null,
            assignedAt: null,
            assignedBy: null,
            reviewerId: null,
            reviewerAssignedAt: null,
            reviewerAssignedBy: null,
            startTime: null,
            pausedAt: null,
            totalPausedMs: 0,
            executionCompletedAt: null,
            reviewStartedAt: null,
            reviewCompletedAt: null,
            completionTime: null,
            inventoryApproved: false,
            inventoryApprovedAt: null,
            description: 'Condensacao intensa no forro e gotejamento sobre area social.',
            materialsUsed: [],
            refacaoNumero: 0,
            motivoRefacao: null,
            lastRejectedAt: null
        },
        {
            id: 1096,
            title: 'Fechadura RFID Offline',
            category: 'Manutencao',
            location: 'Ala Leste - Quarto 102',
            priority: 'normal',
            complexity: 'simples',
            status: 'in_progress',
            reviewState: 'designated',
            createdBy: 2,
            createdTime: now - 1000 * 60 * 180,
            notifiedTime: now - 1000 * 60 * 180,
            assignedTo: 4,
            assignedAt: now - 1000 * 60 * 130,
            assignedBy: 2,
            reviewerId: 5,
            reviewerAssignedAt: now - 1000 * 60 * 120,
            reviewerAssignedBy: 2,
            startTime: now - 1000 * 60 * 115,
            pausedAt: null,
            totalPausedMs: 0,
            executionCompletedAt: null,
            reviewStartedAt: null,
            reviewCompletedAt: null,
            completionTime: null,
            inventoryApproved: false,
            inventoryApprovedAt: null,
            description: 'Hospede sem acesso ao quarto. Validar pilhas e modulo RFID.',
            materialsUsed: [],
            refacaoNumero: 0,
            motivoRefacao: null,
            lastRejectedAt: null
        },
        {
            id: 1090,
            title: 'Controle TV Lobby',
            category: 'Manutencao',
            location: 'Lobby Principal',
            priority: 'normal',
            complexity: 'simples',
            status: 'completed',
            reviewState: 'approved',
            createdBy: 2,
            createdTime: now - 1000 * 60 * 60 * 6,
            notifiedTime: now - 1000 * 60 * 60 * 6,
            assignedTo: 4,
            assignedAt: now - 1000 * 60 * 60 * 5.5,
            assignedBy: 2,
            reviewerId: 2,
            reviewerAssignedAt: now - 1000 * 60 * 60 * 5.4,
            reviewerAssignedBy: 1,
            startTime: now - 1000 * 60 * 60 * 5,
            pausedAt: null,
            totalPausedMs: 0,
            executionCompletedAt: now - 1000 * 60 * 60 * 3.2,
            reviewStartedAt: now - 1000 * 60 * 60 * 3.1,
            reviewCompletedAt: now - 1000 * 60 * 60 * 3,
            completionTime: now - 1000 * 60 * 60 * 3,
            inventoryApproved: true,
            inventoryApprovedAt: now - 1000 * 60 * 60 * 2.8,
            description: 'Troca de pilhas e recalibracao do controle universal.',
            materialsUsed: [{ inventoryId: 1, quantity: 2 }],
            refacaoNumero: 0,
            motivoRefacao: null,
            lastRejectedAt: null
        }
    ]
};

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function ensureNumber(value, fallback) {
    return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function nextId(items) {
    return items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
}

function normalizeTicket(ticket) {
    return {
        category: 'Manutencao',
        description: '',
        priority: 'normal',
        complexity: 'simples',
        createdBy: null,
        createdTime: Date.now(),
        notifiedTime: Date.now(),
        status: 'new',
        reviewState: 'pending_assignment',
        assignedTo: null,
        assignedAt: null,
        assignedBy: null,
        reviewerId: null,
        reviewerAssignedAt: null,
        reviewerAssignedBy: null,
        startTime: null,
        pausedAt: null,
        totalPausedMs: 0,
        executionCompletedAt: null,
        reviewStartedAt: null,
        reviewCompletedAt: null,
        completionTime: null,
        inventoryApproved: false,
        inventoryApprovedAt: null,
        materialsUsed: [],
        refacaoNumero: 0,
        motivoRefacao: null,
        lastRejectedAt: null,
        ...ticket
    };
}

function normalizeMessage(message) {
    return { ticketId: null, type: 'notification', read: false, time: Date.now(), ...message };
}

function normalizeComment(comment) {
    return { kind: 'comment', time: Date.now(), ...comment };
}

const DB_VERSION = 2; // Bump to force localStorage reset when schema changes

function normalizeDatabase(rawDb) {
    const seed = clone(initialDatabase);
    const db = rawDb || {};

    // Check version — if mismatch, force full reset
    if (db._version !== DB_VERSION) {
        const fresh = seed;
        fresh._version = DB_VERSION;
        return fresh;
    }

    return {
        _version: DB_VERSION,
        users: seed.users, // Always use seed users to prevent stale logins
        messages: Array.isArray(db.messages) ? db.messages.map(normalizeMessage) : seed.messages.map(normalizeMessage),
        ticketComments: Array.isArray(db.ticketComments) ? db.ticketComments.map(normalizeComment) : seed.ticketComments.map(normalizeComment),
        inventory: Array.isArray(db.inventory) && db.inventory.length ? db.inventory.map(item => ({ unitCost: 0, area: 'Geral', ...item })) : seed.inventory,
        tickets: Array.isArray(db.tickets) && db.tickets.length ? db.tickets.map(normalizeTicket) : seed.tickets.map(normalizeTicket)
    };
}

function computeExecutionElapsedMs(ticket) {
    if (!ticket || !ticket.startTime) return 0;
    const endReference = ticket.executionCompletedAt || ticket.completionTime || ticket.pausedAt || Date.now();
    return Math.max(0, endReference - ticket.startTime - (ticket.totalPausedMs || 0));
}

function computeReviewElapsedMs(ticket) {
    if (!ticket || !ticket.reviewStartedAt) return 0;
    return Math.max(0, (ticket.reviewCompletedAt || Date.now()) - ticket.reviewStartedAt);
}

function computeTimeToStartMs(ticket) {
    if (!ticket?.assignedAt || !ticket?.startTime) return 0;
    return Math.max(0, ticket.startTime - ticket.assignedAt);
}

function computeTicketMaterialsValue(ticket, inventory) {
    return (ticket.materialsUsed || []).reduce((sum, material) => {
        const item = inventory.find(entry => entry.id === material.inventoryId);
        return sum + ((item?.unitCost || 0) * material.quantity);
    }, 0);
}

function canUserCommentOnTicket(ticket, user) {
    if (!ticket || !user) return false;
    if (['admin_geral', 'admin_manutencao'].includes(user.role)) return true;
    if (user.role === 'trabalhador') return ticket.assignedTo === user.id || ticket.reviewerId === user.id;
    return false;
}

window.MockDB = {
    init: function() {
        const raw = localStorage.getItem(STORAGE_KEY);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeDatabase(raw ? JSON.parse(raw) : null)));
    },

    get: function() {
        const raw = localStorage.getItem(STORAGE_KEY);
        return normalizeDatabase(raw ? JSON.parse(raw) : null);
    },

    save: function(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeDatabase(data)));
    },

    reset: function() {
        this.save(clone(initialDatabase));
        localStorage.removeItem(USER_KEY);
    },

    getCurrentUser: function() {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    login: function(username, password) {
        const user = this.get().users.find(entry => entry.username === username && entry.password === password);
        if (user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            return user;
        }
        return null;
    },

    logout: function() {
        localStorage.removeItem(USER_KEY);
        window.location.href = 'login.html';
    },

    requireLogin: function(allowedRoles = []) {
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return null;
        }
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            alert('Acesso negado. Voce nao tem permissao para acessar esta pagina.');
            this.routeUser(user);
            return null;
        }
        return user;
    },

    routeUser: function(user) {
        window.location.href = this.getHomePageForUser(user);
    },

    getHomePageForUser: function(user) {
        if (user.role === 'trabalhador') return 'mobile_app.html';
        if (['recepcao', 'camareira'].includes(user.role)) return 'reception_report.html';
        return 'dashboard.html';
    },

    populateUserProfile: function(user, options = {}) {
        const initialsNode = document.getElementById(options.initialsId || 'userInitials');
        const nameNode = document.getElementById(options.nameId || 'userNameLabel');
        const roleNode = document.getElementById(options.roleId || 'userRoleLabel');
        if (initialsNode) initialsNode.innerText = user.name.substring(0, 2).toUpperCase();
        if (nameNode) nameNode.innerText = user.name;
        if (roleNode) roleNode.innerText = user.role.toUpperCase().replace('_', ' ');
    },

    buildDesktopNav: function(user, currentPage) {
        const items = [
            { href: 'dashboard.html', label: 'Dashboard Geral', icon: 'layout-dashboard', roles: ['admin_geral', 'admin_manutencao', 'controlador'] },
            { href: 'os_list.html', label: 'Quadro Kanban', icon: 'list-todo', roles: ['admin_geral', 'admin_manutencao'] },
            { href: 'dashboard_create_os.html', label: 'Criar tarefa', icon: 'plus-circle', roles: ['admin_geral', 'admin_manutencao'] },
            { href: 'reception_report.html', label: 'Reportar Problema', icon: 'bell-ring', roles: ['admin_geral', 'admin_manutencao', 'controlador', 'trabalhador', 'recepcao', 'camareira'] },
            { href: 'preventive_schedule.html', label: 'Preventivas', icon: 'calendar-check-2', roles: ['admin_geral', 'admin_manutencao', 'controlador'] },
            { href: 'inventory_leak.html', label: 'Sangria / Inventario', icon: 'shield-alert', roles: ['admin_geral', 'controlador'] },
            { href: 'messages.html', label: 'Notificacoes', icon: 'mail', roles: ['admin_geral', 'admin_manutencao', 'controlador', 'trabalhador'] }
        ];
        const limitedRoles = ['recepcao', 'camareira', 'trabalhador'];
        const visibleItems = limitedRoles.includes(user.role) ? items.filter(item => item.roles.includes(user.role)) : items;
        return visibleItems.map(item => {
            const active = item.href === currentPage;
            const activeClass = active
                ? 'bg-teal-50 dark:bg-teal-600/20 text-teal-700 dark:text-teal-400 font-medium border border-teal-200 dark:border-teal-500/30'
                : 'hover:bg-gray-100 dark:hover:bg-slate-700/50 transition';
            return `<a href="${item.href}" class="flex items-center gap-3 px-4 py-3 rounded-lg ${activeClass}"><i data-lucide="${item.icon}" class="w-5 h-5"></i> <span>${item.label}</span></a>`;
        }).join('');
    },

    getMobileScheduleLink: function(user) {
        if (user.role === 'controlador') return 'preventive_schedule.html';
        const db = this.get();
        const activeTicket = db.tickets.find(ticket =>
            (ticket.assignedTo === user.id && ['designated', 'in_progress', 'awaiting_review'].includes(ticket.status))
            || (ticket.reviewerId === user.id && ticket.status === 'awaiting_review')
        );
        return activeTicket ? `mobile_os_detail.html?ticketId=${activeTicket.id}` : 'mobile_new_os.html';
    },

    getExecutors: function() {
        return this.get().users.filter(user => user.role === 'trabalhador');
    },

    getTicketById: function(ticketId) {
        return this.get().tickets.find(ticket => ticket.id === Number(ticketId)) || null;
    },

    getTicketComments: function(ticketId) {
        return this.get().ticketComments.filter(comment => comment.ticketId === Number(ticketId)).sort((a, b) => a.time - b.time);
    },

    createNotification: function(db, payload) {
        db.messages.push(normalizeMessage({
            id: nextId(db.messages),
            from: Number(payload.from),
            to: Number(payload.to),
            ticketId: payload.ticketId ? Number(payload.ticketId) : null,
            content: payload.content,
            type: payload.type || 'notification',
            read: false,
            time: Date.now()
        }));
    },

    addTicketComment: function(ticketId, authorId, content, kind = 'comment') {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        const author = db.users.find(entry => entry.id === Number(authorId));
        if (!ticket || !author || !content.trim() || !canUserCommentOnTicket(ticket, author)) return null;
        const comment = { id: nextId(db.ticketComments), ticketId: Number(ticketId), authorId: Number(authorId), content: content.trim(), kind, time: Date.now() };
        db.ticketComments.push(comment);
        this.save(db);
        return comment;
    },

    createTicket: function(payload) {
        const db = this.get();
        const user = this.getCurrentUser();
        const ticket = normalizeTicket({
            id: nextId(db.tickets),
            title: payload.title,
            category: payload.category || 'Manutencao',
            location: payload.location,
            priority: payload.priority || 'normal',
            complexity: payload.complexity || 'simples',
            status: 'new',
            reviewState: 'pending_assignment',
            createdBy: user?.id || null,
            createdTime: Date.now(),
            notifiedTime: Date.now(),
            description: payload.description || ''
        });
        db.tickets.unshift(ticket);
        db.ticketComments.push(normalizeComment({
            id: nextId(db.ticketComments),
            ticketId: ticket.id,
            authorId: user?.id || null,
            content: 'Report inicial registrado no sistema.',
            kind: 'system',
            time: Date.now()
        }));
        this.save(db);
        return ticket;
    },

    assignTicket: function(ticketId, assigneeId, senderId, content) {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        const assignee = db.users.find(entry => entry.id === Number(assigneeId));
        if (!ticket || !assignee) return null;

        ticket.assignedTo = Number(assigneeId);
        ticket.assignedAt = Date.now();
        ticket.assignedBy = Number(senderId);
        ticket.status = 'designated';
        ticket.startTime = null;
        ticket.pausedAt = null;
        ticket.totalPausedMs = 0;
        ticket.executionCompletedAt = null;
        ticket.reviewStartedAt = null;
        ticket.reviewCompletedAt = null;
        ticket.completionTime = null;
        ticket.inventoryApproved = false;
        ticket.inventoryApprovedAt = null;

        db.ticketComments.push(normalizeComment({
            id: nextId(db.ticketComments),
            ticketId: ticket.id,
            authorId: Number(senderId),
            content: content?.trim() || `Executor designado: ${assignee.name}.`,
            kind: 'system',
            time: Date.now()
        }));
        this.createNotification(db, { from: senderId, to: assigneeId, ticketId: ticket.id, type: 'designacao', content: content?.trim() || `OS #${ticket.id} designada para voce.` });
        this.save(db);
        return ticket;
    },

    getAvailableReviewers: function(ticketId) {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        return db.users.filter(user => ['admin_manutencao', 'trabalhador'].includes(user.role) && user.id !== ticket?.assignedTo);
    },

    assignReviewer: function(ticketId, reviewerId, senderId, content) {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        const reviewer = db.users.find(entry => entry.id === Number(reviewerId));
        if (!ticket || !reviewer || reviewer.id === ticket.assignedTo) return null;

        ticket.reviewerId = reviewer.id;
        ticket.reviewerAssignedAt = Date.now();
        ticket.reviewerAssignedBy = Number(senderId);
        ticket.reviewState = 'designated';

        db.ticketComments.push(normalizeComment({
            id: nextId(db.ticketComments),
            ticketId: ticket.id,
            authorId: Number(senderId),
            content: content?.trim() || `Revisor designado: ${reviewer.name}.`,
            kind: 'system',
            time: Date.now()
        }));
        this.createNotification(db, { from: senderId, to: reviewer.id, ticketId: ticket.id, type: 'revisao', content: content?.trim() || `Voce foi designado como revisor da OS #${ticket.id}.` });
        this.save(db);
        return ticket;
    },

    toggleTicketTimer: function(ticketId) {
        const db = this.get();
        const user = this.getCurrentUser();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        if (!ticket || !user || ticket.assignedTo !== user.id) return null;
        if (!ticket.startTime) {
            ticket.startTime = Date.now();
            ticket.pausedAt = null;
            ticket.status = 'in_progress';
        } else if (ticket.pausedAt) {
            ticket.totalPausedMs += Date.now() - ticket.pausedAt;
            ticket.pausedAt = null;
            ticket.status = 'in_progress';
        } else {
            ticket.pausedAt = Date.now();
        }
        this.save(db);
        return ticket;
    },

    getTicketClock: function(ticketId) {
        const ticket = this.getTicketById(ticketId);
        if (!ticket) return null;
        return {
            elapsedMs: computeExecutionElapsedMs(ticket),
            isRunning: Boolean(ticket.startTime) && !ticket.pausedAt && ticket.status === 'in_progress'
        };
    },

    completeTicket: function(ticketId, materialsUsed) {
        const db = this.get();
        const user = this.getCurrentUser();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        if (!ticket || !user || ticket.assignedTo !== user.id) return null;

        ticket.materialsUsed = (materialsUsed || []).filter(item => Number(item.quantity) > 0).map(item => ({
            inventoryId: Number(item.inventoryId),
            quantity: Number(item.quantity)
        }));
        ticket.executionCompletedAt = Date.now();
        ticket.pausedAt = null;
        ticket.status = 'awaiting_review';
        ticket.reviewState = ticket.reviewerId ? 'designated' : 'pending_assignment';

        db.ticketComments.push(normalizeComment({
            id: nextId(db.ticketComments),
            ticketId: ticket.id,
            authorId: user.id,
            content: `Execucao finalizada${ticket.materialsUsed.length ? ' com materiais informados.' : ' sem consumo de material.'}`,
            kind: 'system',
            time: Date.now()
        }));
        if (ticket.reviewerId) {
            this.createNotification(db, { from: user.id, to: ticket.reviewerId, ticketId: ticket.id, type: 'revisao_pendente', content: `OS #${ticket.id} aguardando sua revisao.` });
        }
        this.save(db);
        return ticket;
    },

    startReview: function(ticketId, userId) {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        if (!ticket || ticket.reviewerId !== Number(userId) || ticket.status !== 'awaiting_review') return null;
        ticket.reviewStartedAt = ticket.reviewStartedAt || Date.now();
        ticket.reviewState = 'in_review';
        this.save(db);
        return ticket;
    },

    approveReview: function(ticketId, userId, content = '') {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        if (!ticket || ticket.reviewerId !== Number(userId) || ticket.status !== 'awaiting_review') return null;
        ticket.reviewStartedAt = ticket.reviewStartedAt || Date.now();
        ticket.reviewCompletedAt = Date.now();
        ticket.reviewState = 'approved';
        ticket.completionTime = Date.now();
        ticket.status = 'completed';
        db.ticketComments.push(normalizeComment({
            id: nextId(db.ticketComments),
            ticketId: ticket.id,
            authorId: Number(userId),
            content: content.trim() || 'Revisao aprovada e OS concluida.',
            kind: 'review',
            time: Date.now()
        }));
        this.save(db);
        return ticket;
    },

    rejectReview: function(ticketId, userId, content = '') {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        if (!ticket || ticket.reviewerId !== Number(userId) || ticket.status !== 'awaiting_review') return null;
        ticket.reviewStartedAt = ticket.reviewStartedAt || Date.now();
        ticket.reviewCompletedAt = Date.now();
        ticket.reviewState = 'rejected';
        ticket.lastRejectedAt = Date.now();
        ticket.motivoRefacao = content.trim() || 'Refacao solicitada pelo revisor.';
        ticket.refacaoNumero = ensureNumber(ticket.refacaoNumero, 0) + 1;
        ticket.status = 'new';
        ticket.assignedTo = null;
        ticket.assignedAt = null;
        ticket.assignedBy = null;
        ticket.reviewerId = null;
        ticket.reviewerAssignedAt = null;
        ticket.reviewerAssignedBy = null;
        ticket.startTime = null;
        ticket.pausedAt = null;
        ticket.totalPausedMs = 0;
        ticket.executionCompletedAt = null;
        ticket.reviewStartedAt = null;
        db.ticketComments.push(normalizeComment({
            id: nextId(db.ticketComments),
            ticketId: ticket.id,
            authorId: Number(userId),
            content: content.trim() || `Refacao #${ticket.refacaoNumero} solicitada.`,
            kind: 'review',
            time: Date.now()
        }));
        this.save(db);
        return ticket;
    },

    approveInventoryForTicket: function(ticketId) {
        const db = this.get();
        const ticket = db.tickets.find(entry => entry.id === Number(ticketId));
        if (!ticket || ticket.status !== 'completed' || ticket.inventoryApproved || !(ticket.materialsUsed || []).length) return null;
        ticket.materialsUsed.forEach(material => {
            const item = db.inventory.find(entry => entry.id === material.inventoryId);
            if (item) item.stock = Math.max(0, item.stock - material.quantity);
        });
        ticket.inventoryApproved = true;
        ticket.inventoryApprovedAt = Date.now();
        this.save(db);
        return ticket;
    },

    getPendingInventoryTickets: function() {
        return this.get().tickets.filter(ticket => ticket.status === 'completed' && !ticket.inventoryApproved && (ticket.materialsUsed || []).length);
    },

    markMessagesAsRead: function(userId) {
        const db = this.get();
        db.messages.forEach(message => {
            if (message.to === Number(userId)) message.read = true;
        });
        this.save(db);
    },

    getUnreadCount: function(userId) {
        return this.get().messages.filter(message => message.to === Number(userId) && !message.read).length;
    },

    getNotificationsForUser: function(userId) {
        return this.get().messages.filter(message => message.to === Number(userId)).sort((a, b) => b.time - a.time);
    },

    getDashboardMetrics: function() {
        const db = this.get();
        const criticalTickets = db.tickets.filter(ticket => ticket.priority === 'critical' && ticket.completionTime);
        const avgCriticalMs = criticalTickets.length ? criticalTickets.reduce((sum, ticket) => sum + computeExecutionElapsedMs(ticket), 0) / criticalTickets.length : 2.1 * 60 * 60 * 1000;
        const leakage = db.tickets.filter(ticket => ticket.status === 'completed' && !ticket.inventoryApproved).reduce((sum, ticket) => sum + computeTicketMaterialsValue(ticket, db.inventory), 0);
        const preventiveBase = 140 + db.tickets.filter(ticket => ticket.category === 'Preventiva').length;
        const completed = db.tickets.filter(ticket => ticket.status === 'completed').length;
        return {
            sla_media_critica: `${String((avgCriticalMs / (1000 * 60 * 60)).toFixed(1)).replace('.', ',')}h`,
            leakage_identified: formatCurrency(leakage),
            preventive_month: `${preventiveBase}/150`,
            co_forced: `${Math.min(99, 88 + completed)}%`
        };
    },

    getEstancamentoSeries: function() {
        const completedTickets = this.get().tickets.filter(ticket => ticket.status === 'completed');
        return completedTickets.length ? completedTickets.map(ticket => ({
            label: `OS ${ticket.id}`,
            hotgest: Math.floor(Math.random() * 1500) + 3000,
            totvs: Math.floor(Math.random() * 50) + 100,
            economyReais: Math.floor(Math.random() * 1500) + 3000
        })) : [
            { label: 'OS 1090', hotgest: 2850, totvs: 250, economyReais: 2850 },
            { label: 'OS 1096', hotgest: 3480, totvs: 150, economyReais: 3480 }
        ];
    },

    getInventorySuggestionsForTicket: function(ticket) {
        const categoryAreaMap = {
            Manutencao: ['AVAC', 'Eletrica', 'Hidraulica', 'Geral'],
            'Limpeza Extra': ['Geral'],
            'Achados / Perdidos': ['Geral'],
            Preventiva: ['AVAC', 'Eletrica', 'Hidraulica']
        };
        const areas = categoryAreaMap[ticket?.category] || ['Geral'];
        return this.get().inventory.filter(item => areas.includes(item.area) || item.area === 'Geral');
    },

    addInventoryItem: function(payload) {
        const db = this.get();
        db.inventory.push({
            id: nextId(db.inventory),
            name: payload.name,
            stock: ensureNumber(payload.stock, 0),
            unit: payload.unit || 'un',
            minStock: ensureNumber(payload.minStock, 0),
            unitCost: ensureNumber(payload.unitCost, 0),
            area: payload.area || 'Geral'
        });
        this.save(db);
        return db.inventory[db.inventory.length - 1];
    },

    importInventoryCSV: function(csvText) {
        const lines = csvText.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        if (lines.length <= 1) return { imported: 0 };
        const importedItems = [];
        for (const line of lines.slice(1)) {
            const [name, stock, unit, minStock, unitCost, area] = line.split(',').map(value => value.trim());
            if (!name) continue;
            importedItems.push(this.addInventoryItem({ name, stock, unit, minStock, unitCost, area }));
        }
        return { imported: importedItems.length, items: importedItems };
    },

    sendDirectMessage: function(fromUserId, toUserId, content, ticketId = null) {
        const db = this.get();
        this.createNotification(db, { from: fromUserId, to: toUserId, ticketId, content, type: ticketId ? 'comentario_os' : 'notification' });
        this.save(db);
        return db.messages[db.messages.length - 1];
    },

    getMessageRecipients: function(userId) {
        return this.get().users.filter(entry => entry.id !== Number(userId));
    },

    getTicketDurations: function(ticketId) {
        const ticket = this.getTicketById(ticketId);
        if (!ticket) return null;
        return {
            timeToStartMs: computeTimeToStartMs(ticket),
            executionMs: computeExecutionElapsedMs(ticket),
            reviewMs: computeReviewElapsedMs(ticket)
        };
    }
};

MockDB.init();

window.mockExport = function(format) {
    if (format === 'pdf') {
        alert('Relatorio PDF gerado com sucesso. Simulacao do MVP.');
    } else if (format === 'csv') {
        alert('CSV exportado com sucesso. Simulacao do MVP.');
    } else {
        alert('Tabela copiada. Simulacao do MVP.');
    }
};
