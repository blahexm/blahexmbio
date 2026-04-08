repeat task.wait() until game:IsLoaded()

local SUPABASE_URL = "https://nzzsqkvjzlaszxswehkd.supabase.co"
local SUPABASE_KEY = "sb_publishable_B04udlxe_F-GxoGCoiFdBQ_LCLS9LVq"
local SEND_INTERVAL = 30

local TRACKED = {
    "Race Reroll", "Trait Reroll", "Clan Reroll",
    "Mythical Chest", "Aura Crate", "Cosmetic Crate",
    "Passive Shard", "Power Shard", "Upper Seal",
}

local httpService = game:GetService("HttpService")
local players = game:GetService("Players")
local replicatedStorage = game:GetService("ReplicatedStorage")
local localPlayer = players.LocalPlayer

local itemImageConfig = nil
local success = pcall(function()
    itemImageConfig = require(replicatedStorage:WaitForChild("Modules", 10):WaitForChild("ItemImageConfig", 10))
end)

local function getImage(itemName)
    if itemImageConfig and itemImageConfig.GetImage then
        local img = itemImageConfig:GetImage(itemName)
        if img and img ~= "rbxassetid0" and img ~= "" then
            return img
        end
    end
    if itemImageConfig and itemImageConfig.Images then
        local img = itemImageConfig.Images[itemName]
        if img and img ~= "rbxassetid0" and img ~= "" then
            return img
        end
    end
    return nil
end

local TRACKED_SET = {}
for _, itemName in ipairs(TRACKED) do
    TRACKED_SET[itemName] = true
end

local remotes = replicatedStorage:WaitForChild("Remotes", 10)
local requestInventoryRemote = remotes and remotes:FindFirstChild("RequestInventory")
local updateInventoryRemote = remotes and remotes:WaitForChild("UpdateInventory", 10)

local cachedInventory = {}

local function extractTracked(inventoryTable)
    local result = {}
    if type(inventoryTable) ~= "table" then return result end
    for _, itemList in pairs(inventoryTable) do
        if type(itemList) == "table" then
            for _, itemData in ipairs(itemList) do
                local itemName = type(itemData) == "table" and itemData.name or nil
                local quantity = type(itemData) == "table" and (itemData.quantity or 1) or nil
                if itemName and TRACKED_SET[itemName] and quantity then
                    result[itemName] = (result[itemName] or 0) + quantity
                end
            end
        end
    end
    return result
end

local function sendToSupabase(data)
    local payload = {}
    for _, itemName in ipairs(TRACKED) do
        payload[itemName] = data[itemName] or 0
    end

    for _, itemName in ipairs(TRACKED) do
        if payload[itemName] > 0 then
            print(string.format("  %-22s = %d | img: %s", itemName, payload[itemName], getImage(itemName) or "N/A"))
        end
    end

    local itemsWithImage = {}
    for _, itemName in ipairs(TRACKED) do
        itemsWithImage[itemName] = {
            quantity = payload[itemName] or 0,
            image = getImage(itemName),
        }
    end

    local sendSuccess, errorMessage = pcall(function()
        local httpRequest = syn and syn.request or (http and http.request) or request
        httpRequest({
            Url = SUPABASE_URL .. "/rest/v1/inventory",
            Method = "POST",
            Headers = {
                ["Content-Type"] = "application/json",
                ["apikey"] = SUPABASE_KEY,
                ["Authorization"] = "Bearer " .. SUPABASE_KEY,
                ["Prefer"] = "resolution=merge-duplicates,return=minimal",
            },
            Body = httpService:JSONEncode({
                username = localPlayer.Name,
                items = itemsWithImage,
            }),
        })
    end)

    print(sendSuccess and ("✅ " .. localPlayer.Name) or ("❌ " .. tostring(errorMessage)))
end

if updateInventoryRemote then
    updateInventoryRemote.OnClientEvent:Connect(function(category, itemList)
        if type(itemList) == "table" then
            cachedInventory[category] = itemList
        end
    end)
end

print("[INV-MODULE] v5 | player:", localPlayer.Name, "| interval:", SEND_INTERVAL .. "s")
print("[INV-MODULE] ItemImageConfig:", itemImageConfig and "loaded" or "failed")

if requestInventoryRemote then
    requestInventoryRemote:FireServer()
    task.wait(0.5)
end

while true do
    local data = extractTracked(cachedInventory)
    if next(data) then
        sendToSupabase(data)
    else
        print("[INV-MODULE] ยังไม่มีข้อมูล inventory")
        if requestInventoryRemote then
            requestInventoryRemote:FireServer()
        end
    end
    task.wait(SEND_INTERVAL)
end